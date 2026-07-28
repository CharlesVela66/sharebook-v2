import { getBooksSearchResultsApi } from "@/features/Books/api/book.api";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const books = await getBooksSearchResultsApi();
        return NextResponse.json(books, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error at fetching books" }, { status: 500 });
    }
}