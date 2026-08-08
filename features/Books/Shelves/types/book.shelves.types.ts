import { Book, Shelf } from "@/db/schema";

export type UpdateBookShelfProps = {
    shelf: Shelf;
    bookId: string;
}

export type ShelfBook = {
    shelfId: string;
    book: Book;
    shelf: Shelf;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export type ResolvedShelfBook = {
    book: Book;
    shelf: Shelf | null;
}