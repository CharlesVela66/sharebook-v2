"use server"

import { db } from "@/db";
import { Book, books, bookSubjects, ratings, subjects } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { UpdateBookRatingProps, UpdateBookResponse } from "../types/book.types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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

export async function createBookSubjects(bookId: string, subjectNames: string[]) : Promise<void>{
    if (subjectNames.length === 0) return;

    const subs = subjectNames.map((s) => {
        return { name: s }
    });

    await db.insert(subjects).values(subs).onConflictDoNothing({ target: subjects.name });

    const subjectIds = await db.select({id: subjects.id}).from(subjects).where(inArray(subjects.name, subjectNames));

    if (!subjectIds || subjectIds.length === 0){
        return;
    }

    const bookSubjectsMap = subjectIds.map((s) => {
        return { book_id: bookId, subject_id: s.id }
    })

    await db.insert(bookSubjects).values(bookSubjectsMap)
}

export async function updateBookRating({rating, bookId} : UpdateBookRatingProps) : Promise<UpdateBookResponse>{
    try {
        const session = await auth();
        if (!session || !session.user) return { message: "User not authenticated", success: false }
        await db.insert(ratings).values({
            user_id: session.user.id,
            book_id: bookId,
            rating
        }).onConflictDoUpdate({
            target: [ratings.user_id, ratings.book_id],
            set: { rating }
        })
        
        revalidatePath(`/book/${bookId}`);
        return { message: "Book rating updated successfully", success: true }
    } catch (error){
        console.error(error);
        return { message: "Error updating the book shelf.", success: false }
    }
}

export async function getUserBookRating(bookId: string): Promise<number | null>{
    try {
        const session = await auth();
        if (!session || !session.user) return null;

        const book = await getBookByWorkId(bookId);

        if (!book) return null;

        const response = await db.select({rating: ratings.rating}).from(ratings).where(and(eq(ratings.user_id, session.user.id), eq(ratings.book_id, book.id)));

        if (!response || response.length === 0) return null;
        
        return response[0].rating;

    } catch (error){
        console.error(error);
        return null;
    }
}