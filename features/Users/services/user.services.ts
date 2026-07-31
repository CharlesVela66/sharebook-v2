import { db } from "@/db";
import { User, users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getUserByEmail(email: string): Promise<User | undefined>{
    try {
        const user = await db.select().from(users).where(eq(users.email, email));
        return user[0];
    } catch (error){
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}