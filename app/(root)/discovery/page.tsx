import { getBooksSearchResultsApi } from '@/features/Books/api/book.api';
import BookCard from '@/features/Books/components/BookCard'

export default async function DiscoveryPage({searchParams} : {
    searchParams: Promise<{q: string}>
}) {
    const resolvedParams = await searchParams;
    const query = resolvedParams.q;

    const books = await getBooksSearchResultsApi(query);

    return (
        <section className='flex flex-col gap-3'>
            {books.map((book) => (
                <BookCard key={book.work_id} book={book}/>
            ))}
        </section>
    )
}