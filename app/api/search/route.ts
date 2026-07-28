import { BookCard } from "@/features/Books/types/book.types";
import { convertRawBookDataToBookCard } from "@/features/Books/utils/book.utils";
import { NextResponse } from "next/server";

const ENDPOINT = "https://openlibrary.org/search.json";

export async function GET() {
    try {
        const response = await fetch(`${ENDPOINT}?q=atomic+habits&limit=10&fields=key,title,author_name,first_publish_year,cover_i,language,publisher,isbn,number_of_pages_median,subject`, {
            method: "GET",
            headers: {
                "User-Agent": "ShareBook (carlosed.velasco@gmail.com)"
            }
        });
        if (response.ok){
            const books = await response.json()

            const convertedBooks: BookCard[] = convertRawBookDataToBookCard(books.docs);

            return NextResponse.json(convertedBooks, {status: 200})
        }
        else {
            return NextResponse.json({error: "Error at fetching books"} , {status: 500})
        }
    } catch (error){
        console.error(error);
        return NextResponse.json({error: "Error at fetching books"} , {status: 500})
    }
}