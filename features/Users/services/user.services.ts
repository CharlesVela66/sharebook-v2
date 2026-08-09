"use server"

import { db } from "@/db";
import { readingGoals, User, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { UpdateUserResponse } from "../types/user.types";
import { editProfileSchema } from "../schema/edit.schema";
import z from "zod";
import { validateUserUpdateData } from "../utils/user.utils";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function getUserByEmail(email: string | null | undefined): Promise<User | undefined>{
    if (!email) return undefined;
    try {
        const user = await db.select().from(users).where(eq(users.email, email));
        return user[0];
    } catch (error){
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export async function getUserById(id: string | null | undefined): Promise<User | undefined>{
    if (!id) return undefined;
    try {
        const user = await db.select().from(users).where(eq(users.id, id));
        return user[0];
    } catch (error){
        console.error('Failed to fetch user:', error);
        return undefined;
    }
}

export async function updateUserInformation(data: z.infer<typeof editProfileSchema>): Promise<UpdateUserResponse>{
    try {
        const validation = validateUserUpdateData(data);
        if (!validation) return { success: false, message: "Invalid data. Try again." };

        const session = await auth();

        if (!session || !session.user) return { success: false, message: "Unauthenticated user. Login to update your info." };

        const response = await db.update(users).set({
            email: data.email,
            first_name: data.firstName,
            last_name: data.lastName,
        }).where(eq(users.id, session.user.id))

        if (!response) return { success: false, message: "There was an error updating your information." };

        revalidatePath(`/user/${session.user.id}`)
        return { success: true, message: "Successfully updated your information" };

    } catch (error) {
        console.error(error);
        return { success: false, message: "There was an error updating your information." }
    }
}

export async function getUserReadingGoal(userId: string | null | undefined) : Promise<number | null> {
    if (!userId) return null;
    try {
        const response = await db.select({ goal: readingGoals.goal }).from(readingGoals).where(and(eq(readingGoals.user_id, userId), eq(readingGoals.year, new Date().getFullYear())));

        if (!response || response.length === 0) return null;

        return response[0].goal;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function updateReadingGoal(goal: number) : Promise<UpdateUserResponse> {
    try {
        if (goal < 1 || goal > 999) {
            return { success: false, message: "Enter a reading goal between 1 and 999." };
        }

        const session = await auth();

        if (!session || !session.user) return { success: false, message: "Unauthenticated user. Login to update your info." };

        const userId = session.user.id;

        await db.insert(readingGoals).values({
            user_id: userId,
            year: new Date().getFullYear(),
            goal: goal,
        }).onConflictDoUpdate({
            target: [readingGoals.user_id, readingGoals.year],
            set: { goal }
        });

        revalidatePath(`/user/${userId}`);
        return { success: true, message: "Successfully updated your reading goal." }
    } catch (error){
        console.error(error);
        return { success: false, message: "Couldn't save your reading goal. Try again." }
    }
}