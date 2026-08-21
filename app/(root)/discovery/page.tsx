import { SearchX, Search } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import { getBooksSearchResultsApi } from '@/features/Books/api/book.api';
import BookCard from '@/features/Books/components/BookCard'

export default async function DiscoveryPage({searchParams} : {
    searchParams: Promise<{q: string}>
}) {
    const resolvedParams = await searchParams;
    const query = resolvedParams.q;

    if (!query) {
        return (
            <EmptyState
                icon={Search}
                title="Search for a book"
                description="Look up a title or author above to discover your next read."
            />
        );
    }

    const books = await getBooksSearchResultsApi(query);

    if (books.length === 0) {
        return (
            <EmptyState
                icon={SearchX}
                title="No books found"
                description={`We couldn't find any books matching "${query}". Try a different title or author.`}
            />
        );
    }

    return (
        <section className='flex flex-col gap-3'>
            {books.map((book) => (
                <BookCard key={book.work_id} book={book}/>
            ))}
        </section>
    )
}