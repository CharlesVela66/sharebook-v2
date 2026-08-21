import FeedList from "@/features/Feed/components/FeedList";

export default async function HomePage({ searchParams }: {
    searchParams: Promise<{ page?: string; limit?: string }>
}) {
    const { page, limit } = await searchParams;

    return <FeedList page={page} limit={limit} />;
}
