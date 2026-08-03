import { Shelf } from "@/db/schema"

export type BookCard = {
    work_id: string;
    title: string;
    author: string;
    image_url: string;
}

export type RawBookData = {
    author_name?: string[];
    cover_i?: number;
    first_publish_year?: number, 
    isbn?: string[];
    key?: string,
    language?: string[],
    number_of_pages_median?: number,
    publisher?: string[],
    title?: string,
    subject?: string[],
}

export type UpdateBookShelfProps = {
    shelf: Shelf;
    bookId: string;
}

export type UpdateBookShelfResponse = {
    success: boolean;
    message: string;
}