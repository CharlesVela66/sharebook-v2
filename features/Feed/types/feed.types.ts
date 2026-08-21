import { Shelf } from "@/db/schema";

export type FeedEventType = "shelf" | "rating" | "review";

// Raw shape returned by the UNION ALL query, before normalization.
// Internal to the service/transformer layer only - never passed to components.
export type FeedRawRow = {
    type: FeedEventType;
    source_id: string;
    actor_id: string;
    actor_first_name: string;
    actor_last_name: string;
    actor_profile_picture: string | null;
    book_id: string;
    book_work_id: string;
    book_title: string;
    book_image_url: string | null;
    shelf_status: Shelf | null;
    rating_value: number | null;
    review_text: string | null;
    created_at: Date | null;
};

export type FeedActor = {
    id: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
};

export type FeedBookLink = {
    id: string;
    workId: string;
    title: string;
    imageUrl: string | null;
};

export type ShelfFeedPayload = {
    type: "shelf";
    shelf: Shelf;
};

export type RatingFeedPayload = {
    type: "rating";
    rating: number;
};

export type ReviewFeedPayload = {
    type: "review";
    review: string;
};

export type FeedPayload = ShelfFeedPayload | RatingFeedPayload | ReviewFeedPayload;

export type FeedEvent = {
    id: string;
    createdAt: Date;
    actor: FeedActor;
    book: FeedBookLink;
    payload: FeedPayload;
};

export type FeedPageParams = {
    page: number;
    limit: number;
};

export type FeedQueryOptions = FeedPageParams & {
    actorIds: string[];
};

export type PaginatedFeedResult = {
    events: FeedEvent[];
    page: number;
    limit: number;
    hasMore: boolean;
};
