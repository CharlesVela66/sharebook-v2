import { BookCard } from "../types/book.types";
import { convertRawBookDataToBookCard } from "../utils/book.utils";

const ENDPOINT = "https://openlibrary.org/search.json";

export async function getBooksSearchResultsApi(): Promise<BookCard[]> {
    const response = await fetch(`${ENDPOINT}?q=atomic+habits&limit=10&fields=key,title,author_name,first_publish_year,cover_i,language,publisher,isbn,number_of_pages_median,subject`, {
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