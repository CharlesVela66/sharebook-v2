import { User } from "@/db/schema";

export type ReviewCardData = {
    id: string;
    review: string;
    updated_at: Date | null;
    user: Pick<User, "id" | "first_name" | "last_name" | "profile_picture">;
}
