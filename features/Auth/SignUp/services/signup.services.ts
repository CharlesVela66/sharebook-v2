'use server'

import z from "zod";
import { signUpSchema } from "../schema/signup.schema";
import { users } from "@/db/schema";
import argon2 from "argon2"
import { db } from "@/db";
import { isEmailExistent } from "../validations/signup.validations";
import { authUserResponse } from "../../shared/types/auth.types";

async function hashPassword(plainPassword: string) {
  try {
    const hash = await argon2.hash(plainPassword, {
      type: argon2.argon2id
    });
    return hash; 
  } catch (err) {
    console.error("Hashing failed", err);
  }
}

export async function createUser(data: z.infer<typeof signUpSchema>) : Promise<authUserResponse>{
    const emailExists = await isEmailExistent(data.email);

    if (emailExists) return { success: false, message: "User with this email already exists" }
    
    const password = await hashPassword(data.password);

    if (!password) {
        return { success: false, message: "There was an error with your password, try again." }
    }

    const user = await db.insert(users).values({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: password
    }).returning();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...safeUser } = user[0];

    return { success: true, user: safeUser, message: "User created! Now you can log in" };
}