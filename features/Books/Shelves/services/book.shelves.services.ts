"use server"

import { auth } from "@/auth";
import { Shelf, shelves } from "@/db/schema";
import { UpdateBookResponse, UpdateBookShelfProps } from "../../types/book.types";
import { revalidatePath } from "next/cache";
import { getBookByWorkId } from "../../services/book.services";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";

export async function updateBookShelf({shelf, bookId} : UpdateBookShelfProps) : Promise<UpdateBookResponse>{
    try {
        const session = await auth();
        if (!session || !session.user) return { message: "User not authenticated", success: false }
        await db.insert(shelves).values({
            user_id: session.user.id,
            book_id: bookId,
            shelf
        }).onConflictDoUpdate({
            target: [shelves.user_id, shelves.book_id],
            set: { shelf }
        })
        
        revalidatePath(`/book/${bookId}`);
        return { message: "Book shelf updated successfully", success: true }
    } catch (error){
        console.error(error);
        return { message: "Error updating the book shelf.", success: false }
    }
}

export async function getUserBookShelf(bookId: string): Promise<Shelf | null>{
    try {
        const session = await auth();
        if (!session || !session.user) return null;

        const book = await getBookByWorkId(bookId);

        if (!book) return null;

        const response = await db.select({shelf: shelves.shelf}).from(shelves).where(and(eq(shelves.user_id, session.user.id), eq(shelves.book_id, book.id)));

        if (!response || response.length === 0) return null;
        
        return response[0].shelf;

    } catch (error){
        console.error(error);
        return null;
    }
}

export async function geCurrentUserBookShelves(){
    const session = await auth();
    
}