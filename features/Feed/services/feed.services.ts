"use server"

import { auth } from "@/auth";
import { db } from "@/db";
import { books, ratings, Shelf, shelves, users } from "@/db/schema";
import { eq, inArray, sql } from "drizzle-orm";
import { unionAll } from "drizzle-orm/pg-core";
import { toFeedEvents } from "../transformers/feed.transformers";
import { FeedEventType, FeedQueryOptions, FeedRawRow, PaginatedFeedResult } from "../types/feed.types";
import { DEFAULT_FEED_LIMIT, DEFAULT_FEED_PAGE, validateFeedPageParams } from "../validations/feed.validations";

const EMPTY_FEED_RESULT: PaginatedFeedResult = {
    events: [],
    page: DEFAULT_FEED_PAGE,
    limit: DEFAULT_FEED_LIMIT,
    hasMore: false,
};

/**
 * One UNION ALL branch: shelf updates for the given actors, normalized to the
 * shared feed row shape (same columns/types as the rating and review branches).
 */
function buildShelfFeedBranch(actorIds: string[]) {
    const branch = db.select({
        // Every raw sql`` field needs its own .as() - not just the ones
        // referenced in ORDER BY. Once a branch is wrapped as a subquery
        // (below), the outer query needs a name for every raw SQL column to
        // reference it at all.
        type: sql<FeedEventType>`'shelf'`.as("type"),
        source_id: sql<string>`${shelves.id}`.as("source_id"),
        actor_id: sql<string>`${shelves.user_id}`.as("actor_id"),
        actor_first_name: users.first_name,
        actor_last_name: users.last_name,
        actor_profile_picture: users.profile_picture,
        book_id: books.id,
        book_work_id: books.open_library_work_id,
        book_title: books.title,
        book_image_url: books.image_url,
        shelf_status: sql<Shelf | null>`${shelves.shelf}`.as("shelf_status"),
        rating_value: sql<number | null>`NULL::integer`.as("rating_value"),
        review_text: sql<string | null>`NULL::text`.as("review_text"),
        created_at: sql`${shelves.created_at}`.mapWith(shelves.created_at).as("created_at"),
    })
        .from(shelves)
        .innerJoin(books, eq(shelves.book_id, books.id))
        .innerJoin(users, eq(shelves.user_id, users.id))
        .where(inArray(shelves.user_id, actorIds));

    return db.select().from(branch.as("feed_event"));
}

/**
 * One UNION ALL branch: rating events for the given actors, normalized to the
 * shared feed row shape (same columns/types as the shelf and review branches).
 */
function buildRatingFeedBranch(actorIds: string[]) {
    const branch = db.select({
        type: sql<FeedEventType>`'rating'`.as("type"),
        source_id: sql<string>`${ratings.id}`.as("source_id"),
        actor_id: sql<string>`${ratings.user_id}`.as("actor_id"),
        actor_first_name: users.first_name,
        actor_last_name: users.last_name,
        actor_profile_picture: users.profile_picture,
        book_id: books.id,
        book_work_id: books.open_library_work_id,
        book_title: books.title,
        book_image_url: books.image_url,
        shelf_status: sql<Shelf | null>`NULL::shelf_enum`.as("shelf_status"),
        rating_value: sql<number | null>`${ratings.rating}`.mapWith(ratings.rating).as("rating_value"),
        review_text: sql<string | null>`NULL::text`.as("review_text"),
        created_at: sql`${ratings.created_at}`.mapWith(ratings.created_at).as("created_at"),
    })
        .from(ratings)
        .innerJoin(books, eq(ratings.book_id, books.id))
        .innerJoin(users, eq(ratings.user_id, users.id))
        .where(inArray(ratings.user_id, actorIds));

    return db.select().from(branch.as("feed_event"));
}

/**
 * Combines every active branch with UNION ALL (or returns it as-is when
 * there's only one) and paginates the result. Ordered by created_at, with
 * source_id as a tiebreaker for rows sharing the same timestamp.
 *
 * Fetches `limit + 1` rows so the caller can derive `hasMore` without a
 * separate COUNT(*) query.
 */
async function fetchFeedRows(options: FeedQueryOptions): Promise<FeedRawRow[]> {
    const { actorIds, page, limit } = options;
    const offset = (page - 1) * limit;

    // Phase 3 pushes buildReviewFeedBranch here - purely additive, no
    // restructuring of the composition below required.
    const branches = [buildShelfFeedBranch(actorIds), buildRatingFeedBranch(actorIds)];

    const [firstBranch, secondBranch, ...restBranches] = branches;
    const combinedQuery = secondBranch
        ? unionAll(firstBranch, secondBranch, ...restBranches)
        : firstBranch;

    const rows = await combinedQuery
        .orderBy(sql`created_at desc, source_id desc`)
        .limit(limit + 1)
        .offset(offset);

    return rows;
}

/**
 * Which actors' events should appear in the feed.
 * Phase 4 will widen this to [selfId, ...await getAcceptedFriendIds(selfId)].
 */
function resolveActorIds(selfId: string): string[] {
    return [selfId];
}

/**
 * Fetches one page of the current user's feed (shelf/rating/review events).
 * Returns an empty, safe result when unauthenticated or on error - never throws.
 */
export async function getFeedEvents(params: { page?: unknown; limit?: unknown }): Promise<PaginatedFeedResult> {
    try {
        const session = await auth();
        if (!session || !session.user) return EMPTY_FEED_RESULT;

        const { page, limit } = validateFeedPageParams(params);
        const actorIds = resolveActorIds(session.user.id);

        const rows = await fetchFeedRows({ actorIds, page, limit });
        const hasMore = rows.length > limit;
        const events = toFeedEvents(rows.slice(0, limit));

        return { events, page, limit, hasMore };
    } catch (error) {
        console.error(error);
        return EMPTY_FEED_RESULT;
    }
}
