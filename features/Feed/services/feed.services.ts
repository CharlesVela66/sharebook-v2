"use server"

import { auth } from "@/auth";
import { db } from "@/db";
import { books, shelves, users } from "@/db/schema";
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
    return db.select({
        // Explicit .as() here because these two are referenced by name in the
        // ORDER BY below - Drizzle doesn't SQL-alias plain `key: column` remaps,
        // it only maps them back to these keys positionally after the query runs.
        type: sql<FeedEventType>`'shelf'`.as("type"),
        source_id: sql<string>`${shelves.id}`.as("source_id"),
        actor_id: shelves.user_id,
        actor_first_name: users.first_name,
        actor_last_name: users.last_name,
        actor_profile_picture: users.profile_picture,
        book_id: books.id,
        book_work_id: books.open_library_work_id,
        book_title: books.title,
        book_image_url: books.image_url,
        shelf_status: shelves.shelf,
        rating_value: sql<number | null>`NULL::integer`,
        review_text: sql<string | null>`NULL::text`,
        created_at: shelves.created_at,
    })
        .from(shelves)
        .innerJoin(books, eq(shelves.book_id, books.id))
        .innerJoin(users, eq(shelves.user_id, users.id))
        .where(inArray(shelves.user_id, actorIds));
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

    // Phase 2 pushes buildRatingFeedBranch, phase 3 pushes buildReviewFeedBranch -
    // both purely additive here, no restructuring of the composition below required.
    const branches = [buildShelfFeedBranch(actorIds)];

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
