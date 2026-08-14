"use server"

import { auth } from "@/auth";
import { db } from "@/db";
import { friends, users } from "@/db/schema";
import { alias } from "drizzle-orm/pg-core";
import { eq, or } from "drizzle-orm";
import { FriendData } from "../types/user.friends.types";

const requester = alias(users, "requester");
const receiver = alias(users, "receiver");

export async function getFriends(): Promise<FriendData[]>{
    try {
        const session = await auth();
        if (!session || !session.user) return [];

        const userId = session.user.id;

        const friendResponse = await db.select({
            id: friends.id,
            user_id: friends.user_id,
            createdAt: friends.created_at,
            updatedAt: friends.updated_at,
            requester,
            receiver,
        })
            .from(friends)
            .innerJoin(requester, eq(friends.user_id, requester.id))
            .innerJoin(receiver, eq(friends.friend_id, receiver.id))
            .where(or(eq(friends.user_id, userId), eq(friends.friend_id, userId)));

        return friendResponse.map(({ id, user_id, createdAt, updatedAt, requester, receiver }) => ({
            id,
            friend: user_id === userId ? receiver : requester,
            createdAt,
            updatedAt,
        }));
    } catch(error){
        console.error(error);
        return [];
    }
}