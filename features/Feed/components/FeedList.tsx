import { Sparkles } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import { getFeedEvents } from "../services/feed.services";
import FeedCard from "./FeedCard";
import FeedPagination from "./FeedPagination";

type FeedListProps = {
    page?: string;
    limit?: string;
};

export default async function FeedList({ page, limit }: FeedListProps) {
    const { events, hasMore, page: resolvedPage } = await getFeedEvents({ page, limit });

    return (
        <section className="flex flex-col gap-3">
            {events.length > 0 ? (
                events.map((event) => <FeedCard key={event.id} event={event} />)
            ) : (
                <EmptyState
                    icon={Sparkles}
                    title="Your feed is empty"
                    description="Start adding books to your shelves or add some friends to see their activity here."
                />
            )}
            <FeedPagination page={resolvedPage} hasMore={hasMore} />
        </section>
    );
}
