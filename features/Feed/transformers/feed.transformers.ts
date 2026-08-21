import { FeedEvent, FeedPayload, FeedRawRow } from "../types/feed.types";

export const REVIEW_SNIPPET_MAX_LENGTH = 140;

export function truncateReviewSnippet(review: string, maxLength: number = REVIEW_SNIPPET_MAX_LENGTH): string {
    if (review.length <= maxLength) return review;
    return `${review.slice(0, maxLength).trimEnd()}…`;
}

function toFeedPayload(row: FeedRawRow): FeedPayload {
    switch (row.type) {
        case "shelf":
            if (!row.shelf_status) throw new Error(`Feed row ${row.source_id} is missing shelf_status`);
            return { type: "shelf", shelf: row.shelf_status };
        case "rating":
            if (row.rating_value === null) throw new Error(`Feed row ${row.source_id} is missing rating_value`);
            return { type: "rating", rating: row.rating_value };
        case "review":
            if (row.review_text === null) throw new Error(`Feed row ${row.source_id} is missing review_text`);
            return { type: "review", review: truncateReviewSnippet(row.review_text) };
        default: {
            const exhaustiveCheck: never = row.type;
            throw new Error(`Unhandled feed event type: ${exhaustiveCheck}`);
        }
    }
}

export function toFeedEvent(row: FeedRawRow): FeedEvent {
    return {
        id: `${row.type}:${row.source_id}`,
        // created_at is nullable at the column-definition level (no .notNull()),
        // but every row is always populated via defaultNow() at insert time.
        createdAt: row.created_at ?? new Date(0),
        actor: {
            id: row.actor_id,
            first_name: row.actor_first_name,
            last_name: row.actor_last_name,
            profile_picture: row.actor_profile_picture,
        },
        book: {
            id: row.book_id,
            workId: row.book_work_id,
            title: row.book_title,
            imageUrl: row.book_image_url,
        },
        payload: toFeedPayload(row),
    };
}

export function toFeedEvents(rows: FeedRawRow[]): FeedEvent[] {
    return rows.map(toFeedEvent);
}
