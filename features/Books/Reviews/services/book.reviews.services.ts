"use server"

import { getBookByWorkId } from "../../services/book.services";
import { ReviewLike, reviewLikes, reviews, users } from "@/db/schema";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
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

export async function createBookReview(bookId: string, review: string) : Promise<UpdateBookResponse>{
    try {
        const session = await auth();
        if (!session || !session.user) return { message: "User not authenticated", success: false };

        const userId = session.user.id;

        const book = await getBookByWorkId(bookId);

        if (!book) return { success: false, message: "Couldn't find book to insert review. Try again. "};

        const isReview = await userReviewExists(book.id, userId);

        if (isReview) return { success: false, message: "You've already submitted a review for this book." }

        await db.insert(reviews).values({
            user_id: userId,
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

export async function getReviewLikes(reviewId: string) : Promise<ReviewLike[]> {
    try {
        const likes = await db.select().from(reviewLikes).where(eq(reviewLikes.review_id, reviewId));
        return likes;
    } catch(error){
        console.error(error);
        return [];
    }
}

export async function updateReviewLike(reviewId: string, bookId: string, value: boolean): Promise<UpdateBookResponse> {
    try {
        const session = await auth();
        if (!session || !session.user) return { message: "User not authenticated", success: false };

        await db.insert(reviewLikes).values({
            user_id: session.user.id,
            review_id: reviewId,
            is_like: value
        }).onConflictDoUpdate({
            target: [reviewLikes.user_id, reviewLikes.review_id],
            set: { is_like: value }
        })

        revalidatePath(`/book/${bookId}`);
        return { message: `Review ${value ? "like" : "dislike"} updated successfully`, success: true }

    } catch(error){
        console.error(error);
        return { success: false, message: "There was an error updating the book review like." }
    }
}

async function userReviewExists(bookId: string, userId: string): Promise<boolean> {
    try {
        const response = await db.select().from(reviews).where(and(eq(reviews.book_id, bookId), eq(reviews.user_id, userId)));

        return response && response.length > 0;
    } catch(error){
        console.error(error);
        return false;
    }
};
