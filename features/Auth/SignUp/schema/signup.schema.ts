import * as z from "zod"

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name too long."),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name too long."),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters.' })
    .max(32, { message: 'Password cannot exceed 32 characters.' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
    .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character.' })
});