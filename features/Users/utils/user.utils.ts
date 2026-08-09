import z from "zod";
import { editProfileSchema } from "../schema/edit.schema";

export function validateUserUpdateData(data: z.infer<typeof editProfileSchema>): boolean {
    if (!data.email || !data.firstName || !data.lastName) return false;
    return true;
}