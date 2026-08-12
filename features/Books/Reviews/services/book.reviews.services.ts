"use server"

import { getBookByWorkId } from "../../services/book.services";
import { reviews, users } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { UpdateBookResponse } from "../../types/book.types";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { ReviewCardData } from "../types/book.reviews.types";

export async function getBookReviews(bookId: string) : Promise<ReviewCardData[] | null>{
    try {

        const book = await getBookByWorkId(bookId);

        if (!book) return null;

        const response = await db.select({
            id: reviews.id,
            review: reviews.review,
            updated_at: reviews.updated_at,
            user: {
                id: users.id,
                first_name: users.first_name,
                last_name: users.last_name,
                profile_picture: users.profile_picture,
            }
        }).from(reviews).innerJoin(users, eq(reviews.user_id, users.id)).where(eq(reviews.book_id, book.id));

        if (!response || response.length === 0) return null;

        return response;

    } catch (error){
        console.error(error);
        return null;
    }
}

// TODO: look for existing comments for that same book and block the insertion
export async function createBookReview(bookId: string, review: string) : Promise<UpdateBookResponse>{
    try {
        const session = await auth();
        if (!session || !session.user) return { message: "User not authenticated", success: false };

        const book = await getBookByWorkId(bookId);

        if (!book) return { success: false, message: "Couldn't find book to insert review. Try again. "};

        await db.insert(reviews).values({
            user_id: session.user.id,
            book_id: book.id,
            review
        })

        revalidatePath(`/book/${bookId}`);
        return { message: "Book review created successfully", success: true };
    } catch (error){
        console.error(error);
        return { success: false, message: `Error writing the review for the book with id: ${bookId}` }
    }
}