import { Shelf } from "@/db/schema";

export type UpdateUserResponse = {
    success: boolean;
    message: string;
}

export type ProfileStats = {
    totalBooksRead: number;
    shelfDistribution: { shelf: Shelf; count: number}[];
    genreBreakdown: { genre: string; count: number }[];
    booksReadByYear: Record<number, number[]>; // key = year, value = 12-length array (Jan...Dec counts)
}