"use server"

import { auth } from "@/auth";
import { UpdateBookResponse } from "../../types/book.types";
import { ratings } from "@/db/schema";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { getBookByWorkId } from "../../services/book.services";
import { and, eq } from "drizzle-orm";
import { RatingData, RatingUserData, UpdateBookRatingProps } from "../types/book.ratings.types";

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

export async function getBookRatings(bookId: string) : Promise<RatingData | null> {
    try {

        const book = await getBookByWorkId(bookId);

        if (!book) return null;

        const response = await db.select().from(ratings).where(eq(ratings.book_id, book.id));

        if (!response){
            return null;
        }

        const allRatings: RatingUserData[] = response.map((r) => {
            return {
                userId: r.user_id,
                rating: r.rating,
            }
        })

        const result: RatingData = {
            count: allRatings.length,
            average: Math.round((allRatings.reduce((sum, rating) => sum + rating.rating, 0) / allRatings.length) * 10),
            allRatings
        }

        return result;
    } catch(error){
        console.error(error);
        return null;
    }
}