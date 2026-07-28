import { db } from "@/db";
import { Book, books } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getBookByWorkId(workId: string) : Promise<Book | undefined>{
    const dbLookup = await db.select().from(books).where(eq(books.open_library_work_id, workId));

    return dbLookup.length > 0 ? dbLookup[0] : undefined;
}

export async function createBook(data: Omit<Book, "id">) : Promise<Book>{
    const result = await db.insert(books).values({
        title: data.title,
        description: data.description,
        author: data.author,
        publisher: data.publisher,
        isbn: data.isbn,
        page_count: data.page_count,
        year: data.year,
        genre: data.genre,
        image_url: data.image_url,
        language: data.language,
        open_library_work_id: data.open_library_work_id,
        open_library_edition_id: data.open_library_edition_id
    }).returning();

    return result[0];
}