"use server"

import { signOut } from "@/auth";
import { unstable_rethrow } from "next/navigation";
import { authUserResponse } from "../../shared/types/auth.types";

export async function logout() : Promise<authUserResponse>{
     try {
        await signOut({redirectTo: "/login"});
        return { success: true, message: "Log out successful!" }
    } catch (error) {
        unstable_rethrow(error);
        console.error(error);
        return { success: false, message: 'Something went wrong.' };
    }
}