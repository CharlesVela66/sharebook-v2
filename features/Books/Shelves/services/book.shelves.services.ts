"use server"

import { auth } from "@/auth";
import { books, Shelf, shelves } from "@/db/schema";
import { UpdateBookResponse } from "../../types/book.types";
import { revalidatePath } from "next/cache";
import { getBookByWorkId } from "../../services/book.services";
import { getBookDetailsApi } from "../../api/book.api";
import { and, count, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import {  ResolvedShelfBook, ShelfBook, UpdateBookShelfProps } from "../types/book.shelves.types";

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

export async function resolveBookForShelf(workId: string) : Promise<ResolvedShelfBook>{
    const [book, shelf] = await Promise.all([
        getBookDetailsApi(workId),
        getUserBookShelf(workId),
    ]);

    return { book, shelf };
}

export async function getBooksReadCounts(userIds: string[]): Promise<Record<string, number>>{
    if (userIds.length === 0) return {};
    try {
        const response = await db.select({ userId: shelves.user_id, count: count() })
            .from(shelves)
            .where(and(eq(shelves.shelf, "Read"), inArray(shelves.user_id, userIds)))
            .groupBy(shelves.user_id);

        return response.reduce<Record<string, number>>((acc, row) => {
            acc[row.userId] = row.count;
            return acc;
        }, {});
    } catch (error) {
        console.error(error);
        return {};
    }
}

export async function getUserBookShelves(userId: string) : Promise<ShelfBook[]>{
    try {
        const response = await db.select().from(shelves).innerJoin(books, eq(shelves.book_id, books.id)).where(eq(shelves.user_id, userId));
    
        if (!response) return [];

        const bookResult: ShelfBook[] = response.map((item) => {
            return {
                shelfId: item.shelves.id,
                book: item.books,
                shelf: item.shelves.shelf,
                createdAt: item.shelves.created_at,
                updatedAt: item.shelves.updated_at,
            }
        })

        return bookResult;

    } catch (error) {
        console.error(error);
        return [];
    }
}