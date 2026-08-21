import { FeedEvent } from "../types/feed.types";

// The only place with type-specific branching in the Feed feature - FeedCard
// only ever calls this and renders the result, it never inspects event.payload itself.
export function formatFeedMessage(event: FeedEvent): string {
    switch (event.payload.type) {
        case "shelf":
            return `marked as ${event.payload.shelf}`;
        case "rating":
            return `rated it ${event.payload.rating} star${event.payload.rating === 1 ? "" : "s"}`;
        case "review":
            return `wrote a review: "${event.payload.review}"`;
        default: {
            const exhaustiveCheck: never = event.payload;
            throw new Error(`Unhandled feed payload: ${JSON.stringify(exhaustiveCheck)}`);
        }
    }
}

const RELATIVE_TIME_UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["week", 60 * 60 * 24 * 7],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
];

// Generic "{n} {unit} ago" formatter - kept separate from lib/utils.ts's
// formatSentAgo, which is hardcoded to message-specific "Sent ... ago" phrasing.
export function formatFeedRelativeTime(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    for (const [unit, secondsInUnit] of RELATIVE_TIME_UNITS) {
        const value = Math.floor(seconds / secondsInUnit);
        if (value >= 1) return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
    }

    return "just now";
}
