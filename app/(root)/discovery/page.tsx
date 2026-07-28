import BookCard from '@/features/Books/components/BookCard'
import { type BookCard as BookCardType } from '@/features/Books/types/book.types';

export default async function DiscoveryPage() {
    const response = await fetch("http://localhost:3000/api/search");
    const books: BookCardType[] = await response.json();

    console.log(books);
    return (
        <section className='flex flex-col gap-3'>
            {books.map((book) => (
                <BookCard key={book.work_id} book={book}/>
            ))}
        </section>
    )
}