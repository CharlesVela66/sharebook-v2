import { User } from "@/db/schema";
import { SafeUser } from "@/features/Auth/shared/types/auth.types";

export type FriendData = {
    id: string;
    friend: User;
    createdAt: Date | null; // When they started to be friends
    updatedAt: Date | null;
}

export type FriendRequestData = {
    id: string;
    sender: SafeUser;
    createdAt: Date | null;
}

export type FriendStatus = "none" | "pending_sent" | "pending_received" | "friends";

export type FriendStatusResult = {
    status: FriendStatus;
    requestId: string | null; // Set only for pending_sent/pending_received, needed to respond to the request.
}

export type FriendSearchResult = {
    user: SafeUser;
    status: FriendStatus;
    requestId: string | null;
    booksRead: number;
}