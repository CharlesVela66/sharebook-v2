import { User } from "@/db/schema"

export type createUserResponse = {
    message: string,
    user?: User,
}