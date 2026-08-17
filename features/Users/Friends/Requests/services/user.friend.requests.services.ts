"use server"

import { auth } from "@/auth";
import { db } from "@/db";
import { friendRequests, friends, users } from "@/db/schema";
import { alias } from "drizzle-orm/pg-core";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { FriendRequestData } from "../../types/user.friends.types";
import { UpdateUserResponse } from "../../../types/user.types";
import { getFriendStatus } from "../../services/user.friends.services";

const requester = alias(users, "requester");

export async function sendFriendRequest(receiverId: string): Promise<UpdateUserResponse>{
    try {
        const session = await auth();
        if (!session || !session.user) return { success: false, message: "Unauthenticated user. Login to send friend requests." };

        const userId = session.user.id;
        if (userId === receiverId) return { success: false, message: "You can't send yourself a friend request." };

        const { status } = await getFriendStatus(receiverId);
        if (status !== "none") return { success: false, message: "There's already a friend request or friendship between you two." };

        await db.insert(friendRequests).values({
            sender_id: userId,
            receiver_id: receiverId,
            status: "Pending",
        });

        revalidatePath("/friends");
        return { success: true, message: "Friend request sent." };
    } catch (error){
        console.error(error);
        return { success: false, message: "Couldn't send the friend request. Try again." };
    }
}

export async function respondToFriendRequest(requestId: string, accept: boolean): Promise<UpdateUserResponse>{
    try {
        const session = await auth();
        if (!session || !session.user) return { success: false, message: "Unauthenticated user. Login to respond to friend requests." };

        const [request] = await db.select().from(friendRequests).where(eq(friendRequests.id, requestId));
        if (!request || request.receiver_id !== session.user.id) return { success: false, message: "Friend request not found." };

        await db.update(friendRequests).set({ status: accept ? "Accepted" : "Declined" }).where(eq(friendRequests.id, requestId));

        if (accept) {
            await db.insert(friends).values({
                user_id: request.sender_id,
                friend_id: request.receiver_id,
            });
        }

        revalidatePath("/friends");
        return { success: true, message: accept ? "Friend request accepted." : "Friend request declined." };
    } catch (error){
        console.error(error);
        return { success: false, message: "Couldn't respond to the friend request. Try again." };
    }
}

export async function getFriendRequests(): Promise<FriendRequestData[]>{
    try {
        const session = await auth();
        if (!session || !session.user) return [];

        const userId = session.user.id;

        return await db.select({
            id: friendRequests.id,
            createdAt: friendRequests.created_at,
            sender: requester,
        })
            .from(friendRequests)
            .innerJoin(requester, eq(friendRequests.sender_id, requester.id))
            .where(and(eq(friendRequests.receiver_id, userId), eq(friendRequests.status, "Pending")));
    } catch (error){
        console.error(error);
        return [];
    }
}
