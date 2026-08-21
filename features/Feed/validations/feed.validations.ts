import { FeedPageParams } from "../types/feed.types";

export const DEFAULT_FEED_PAGE = 1;
export const DEFAULT_FEED_LIMIT = 20;
export const MAX_FEED_LIMIT = 50;

function toPositiveInt(value: unknown, fallback: number): number {
    const parsed = typeof value === "string" ? parseInt(value, 10) : typeof value === "number" ? value : NaN;
    if (!Number.isFinite(parsed) || parsed < 1) return fallback;
    return Math.floor(parsed);
}

export function validateFeedPageParams(input: { page?: unknown; limit?: unknown }): FeedPageParams {
    const page = toPositiveInt(input.page, DEFAULT_FEED_PAGE);
    const limit = Math.min(toPositiveInt(input.limit, DEFAULT_FEED_LIMIT), MAX_FEED_LIMIT);

    return { page, limit };
}
