'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { loginSchema } from "../schema/login.schema";
import z from "zod";
import { authUserResponse } from "../../shared/types/auth.types";

export async function authenticate(data: z.infer<typeof loginSchema>) : Promise<authUserResponse> {
    try {
        await signIn('credentials', {...data, redirect: false});
        return { success: true, message: "Login successful!" }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                return { success: false, message: 'Invalid credentials.' };
                default:
                return { success: false, message: 'Something went wrong.' };
            }
        }
        throw error;
    }
}