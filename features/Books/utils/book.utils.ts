import { BookCard, RawBookData } from "../types/book.types";

export function convertRawBookDataToBookCard(data: RawBookData[]): BookCard[] {
    const books: BookCard[] = [];
    for (const b of data) {
        if (!b.key) continue;
        const book: BookCard = {
            work_id: b.key.slice(7) ,
            author: b.author_name ? b.author_name.join(", ") : "Anonymous",
            title: b.title ? b.title : "Untitled",
            image_url: b.cover_i ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg` : "/book-placeholder",
        }
        books.push(book);
    }
    return books;
}