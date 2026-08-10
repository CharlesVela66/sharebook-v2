import z from "zod";
import { editProfileSchema } from "../schema/edit.schema";
import { ShelfBook } from "@/features/Books/Shelves/types/book.shelves.types";
import { ProfileStats } from "../types/user.types";
import { Shelf } from "@/db/schema";

export function validateUserUpdateData(data: z.infer<typeof editProfileSchema>): boolean {
    if (!data.email || !data.firstName || !data.lastName) return false;
    return true;
}

export function getProfileStats(shelves: ShelfBook[]) : ProfileStats {
    const shelvesTypes: Shelf[] = ["Currently reading", "Read", "Want to read"]

    const distribution = shelvesTypes.map((s) => {
        return { 
            shelf: s,
            count: shelves.filter((b) => b.shelf === s).length 
        };
    });

    const readBooks = shelves.filter((s) => s.shelf === "Read");

    const genreCounts = readBooks.reduce<Record<string, number>>((acc, { book }) => {
        const genre = book.genre ?? "Uncategorized";
        acc[genre] = (acc[genre] ?? 0) + 1;
        return acc;
    }, {});

    const genreBreakdown = Object.entries(genreCounts).map(([genre, count]) => ({ genre, count }));

    const booksReadByYear = readBooks.reduce<Record<number, number[]>>((acc, { updatedAt }) => {
        if (!updatedAt) return acc;

        const year = updatedAt.getFullYear();
        const month = updatedAt.getMonth();

        if (!acc[year]) acc[year] = new Array(12).fill(0);
        acc[year][month] += 1;

        return acc;
    }, {});

    return {
        totalBooksRead: distribution.find((s) => s.shelf === "Read")?.count || 0,
        shelfDistribution: distribution,
        genreBreakdown,
        booksReadByYear,
    }
}