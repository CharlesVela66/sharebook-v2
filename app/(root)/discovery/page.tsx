import { getBooksSearchResultsApi } from '@/features/Books/api/book.api';
import BookCard from '@/features/Books/components/BookCard'

export default async function DiscoveryPage() {
    const books = await getBooksSearchResultsApi();

    return (
        <section className='flex flex-col gap-3'>
            {books.map((book) => (
                <BookCard key={book.work_id} book={book}/>
            ))}
        </section>
    )
}