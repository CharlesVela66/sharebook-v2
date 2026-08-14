import { User } from "@/db/schema";

export type FriendData = {
    id: string;
    friend: User;
    createdAt: Date | null; // When they started to be friends
    updatedAt: Date | null;
}