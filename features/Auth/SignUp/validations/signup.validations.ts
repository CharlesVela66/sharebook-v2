import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function isEmailExistent(email: string) : Promise<boolean>{
    const user = await db.select().from(users).where(eq(users.email, email));

    return user.length > 0 ? true : false;
}