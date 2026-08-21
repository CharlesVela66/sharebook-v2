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
                <p className="text-center text-muted text-sm font-normal">
                    Your feed is empty - start adding books to your shelves or adding new friends!
                </p>
            )}
            <FeedPagination page={resolvedPage} hasMore={hasMore} />
        </section>
    );
}
