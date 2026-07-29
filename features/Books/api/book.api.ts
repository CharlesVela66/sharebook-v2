import { Book } from "@/db/schema";
import { BookCard } from "../types/book.types";
import { convertRawBookDataToBookCard, prepareApiBookForDb } from "../utils/book.utils";
import { createBook, getBookByWorkId } from "../services/book.services";
import { OpenLibraryAuthor, OpenLibraryAuthorRef, OpenLibraryEditionsResponse, OpenLibraryWork } from "../types/book.api.types";

const ENDPOINT = "https://openlibrary.org/search.json";

export async function getBooksSearchResultsApi(query: string): Promise<BookCard[]> {
    const response = await fetch(`${ENDPOINT}?q=${query}&limit=10&fields=key,title,author_name,first_publish_year,cover_i,language,publisher,isbn,number_of_pages_median,subject`, {
        method: "GET",
        headers: {
            "User-Agent": "ShareBook (carlosed.velasco@gmail.com)"
        }
    });

    if (!response.ok) {
        throw new Error("Error at fetching books");
    }

    const books = await response.json();
    return convertRawBookDataToBookCard(books.docs);
}

export async function getAuthorNamesApi(authors: OpenLibraryAuthorRef[]): Promise<string[]> {
    return Promise.all(
        authors.map(async ({ author }) => {
            const authorResponse = await fetch(`https://openlibrary.org${author.key}.json`, {
                method: "GET",
                headers: {
                    "User-Agent": "ShareBook (carlosed.velasco@gmail.com)"
                }
            });

            if (!authorResponse.ok) {
                throw new Error(`Error at fetching author with key: ${author.key}`);
            }

            const authorData: OpenLibraryAuthor = await authorResponse.json();
            return authorData.name;
        })
    );
}

export async function getBookWorkApi(workId: string): Promise<OpenLibraryWork> {
    const workResponse = await fetch(`https://openlibrary.org/works/${workId}.json`, {
        method: "GET",
        headers: {
            "User-Agent": "ShareBook (carlosed.velasco@gmail.com)"
        }
    });

    if (!workResponse.ok){
        throw new Error(`Error at fetching book's work with Work ID: ${workId}`);
    }

    return workResponse.json();
}

export async function getBookEditionsApi(workId: string): Promise<OpenLibraryEditionsResponse> {
    const editionResponse = await fetch(`https://openlibrary.org/works/${workId}/editions.json`, {
        method: "GET",
        headers: {
            "User-Agent": "ShareBook (carlosed.velasco@gmail.com)"
        }
    });

    if (!editionResponse.ok){
        throw new Error(`Error at fetching book's editions with Work ID: ${workId}`);
    }

    return editionResponse.json();
}

export async function getBookDetailsApi(id: string): Promise<Book> {
    const bookDb = await getBookByWorkId(id);

    if (bookDb) return bookDb;

    const bookWork = await getBookWorkApi(id);
    const bookEditions = await getBookEditionsApi(id);
    const authorNames = await getAuthorNamesApi(bookWork.authors);

    const bookObject = prepareApiBookForDb(bookWork, bookEditions, authorNames, id);

    const book = await createBook(bookObject);

    return book;
}