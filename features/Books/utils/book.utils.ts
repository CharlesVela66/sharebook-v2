import { Book } from "@/db/schema";
import { OpenLibraryEditionsResponse, OpenLibraryWork } from "../types/book.api.types";
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

export function prepareApiBookForDb(bookWork: OpenLibraryWork, bookEditions: OpenLibraryEditionsResponse, authorNames: string[], id: string){
    const bookObject: Omit<Book, "id"> = {
        title: bookWork.title,
        description: bookWork.description ?? "",
        author: authorNames.join(", "),
        publisher: bookEditions.entries[0].publishers.join(", "),
        isbn: bookEditions.entries[0].isbn_13?.[0] ?? "",
        page_count: null,
        year: new Date(bookWork.created.value).getFullYear(),
        genre: null,
        image_url: bookWork.covers?.[0] ? `https://covers.openlibrary.org/b/id/${bookWork.covers[0]}-L.jpg` : "",
        language: bookEditions.entries[0].languages[0].key.split("/").pop() ?? "",
        open_library_work_id: id,
        open_library_edition_id: "",
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
    }

    return bookObject;
}