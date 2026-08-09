import * as z from "zod"

export const editProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name too long."),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long."),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});