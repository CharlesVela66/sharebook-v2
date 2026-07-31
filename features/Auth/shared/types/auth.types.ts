import { User } from "@/db/schema"

export type SafeUser = Omit<User, "password">

export type authUserResponse = {
    success: boolean,
    message: string,
    user?: SafeUser,
}