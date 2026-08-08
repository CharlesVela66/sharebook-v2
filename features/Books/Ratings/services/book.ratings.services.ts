"use server"

import { auth } from "@/auth";
import { UpdateBookRatingProps, UpdateBookResponse } from "../../types/book.types";
import { ratings } from "@/db/schema";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { getBookByWorkId } from "../../services/book.services";
import { and, eq } from "drizzle-orm";

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