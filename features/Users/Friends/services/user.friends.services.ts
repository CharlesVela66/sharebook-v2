"use server"

import { auth } from "@/auth";
import { db } from "@/db";
import { friendRequests, friends, users } from "@/db/schema";
import { alias } from "drizzle-orm/pg-core";
import { and, eq, inArray, or } from "drizzle-orm";
import { FriendData, FriendSearchResult, FriendStatusResult } from "../types/user.friends.types";
import { searchUsers } from "../../services/user.services";
import { getBooksReadCounts } from "@/features/Books/Shelves/services/book.shelves.services";

const requester = alias(users, "requester");
const receiver = alias(users, "receiver");

export async function getFriendCountByUserId(userId: string) : Promise<number | null> {
    try {
        const friendResponse = await db.select().from(friends).where(
            or(
                eq(friends.user_id, userId),
                eq(friends.friend_id, userId)
            )
        )
        return friendResponse.length;
    } catch(error){
        console.error(error);
        return null;
    }
}

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

/**
 * Flat list of the other user's id for every accepted friendship involving
 * `userId` - e.g. for the Feed's actor filter, which only needs ids.
 */
export async function getAcceptedFriendIds(userId: string): Promise<string[]> {
    try {
        const friendRows = await db.select({
            user_id: friends.user_id,
            friend_id: friends.friend_id,
        }).from(friends).where(or(eq(friends.user_id, userId), eq(friends.friend_id, userId)));

        return friendRows.map((row) => (row.user_id === userId ? row.friend_id : row.user_id));
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getFriendStatus(otherUserId: string): Promise<FriendStatusResult>{
    try {
        const session = await auth();
        if (!session || !session.user) return { status: "none", requestId: null };

        const userId = session.user.id;

        const [friendRow] = await db.select().from(friends).where(
            or(
                and(eq(friends.user_id, userId), eq(friends.friend_id, otherUserId)),
                and(eq(friends.user_id, otherUserId), eq(friends.friend_id, userId)),
            )
        );

        if (friendRow) return { status: "friends", requestId: null };

        const [requestRow] = await db.select().from(friendRequests).where(
            and(
                eq(friendRequests.status, "Pending"),
                or(
                    and(eq(friendRequests.sender_id, userId), eq(friendRequests.receiver_id, otherUserId)),
                    and(eq(friendRequests.sender_id, otherUserId), eq(friendRequests.receiver_id, userId)),
                )
            )
        );

        if (!requestRow) return { status: "none", requestId: null };

        return {
            status: requestRow.sender_id === userId ? "pending_sent" : "pending_received",
            requestId: requestRow.id,
        };
    } catch (error){
        console.error(error);
        return { status: "none", requestId: null };
    }
}

export async function getFriendStatusesForUsers(userIds: string[]): Promise<Record<string, FriendStatusResult>>{
    if (userIds.length === 0) return {};
    try {
        const session = await auth();
        if (!session || !session.user) return {};

        const userId = session.user.id;

        const [friendRows, requestRows] = await Promise.all([
            db.select().from(friends).where(
                or(
                    and(eq(friends.user_id, userId), inArray(friends.friend_id, userIds)),
                    and(eq(friends.friend_id, userId), inArray(friends.user_id, userIds)),
                )
            ),
            db.select().from(friendRequests).where(
                and(
                    eq(friendRequests.status, "Pending"),
                    or(
                        and(eq(friendRequests.sender_id, userId), inArray(friendRequests.receiver_id, userIds)),
                        and(eq(friendRequests.receiver_id, userId), inArray(friendRequests.sender_id, userIds)),
                    )
                )
            ),
        ]);

        const result: Record<string, FriendStatusResult> = {};

        for (const row of friendRows) {
            const otherId = row.user_id === userId ? row.friend_id : row.user_id;
            result[otherId] = { status: "friends", requestId: null };
        }

        for (const row of requestRows) {
            const otherId = row.sender_id === userId ? row.receiver_id : row.sender_id;
            result[otherId] = {
                status: row.sender_id === userId ? "pending_sent" : "pending_received",
                requestId: row.id,
            };
        }

        return result;
    } catch (error){
        console.error(error);
        return {};
    }
}

export async function searchFriends(query: string): Promise<FriendSearchResult[]>{
    try {
        const matchedUsers = await searchUsers(query);
        if (matchedUsers.length === 0) return [];

        const userIds = matchedUsers.map((u) => u.id);

        const [statuses, booksReadCounts] = await Promise.all([
            getFriendStatusesForUsers(userIds),
            getBooksReadCounts(userIds),
        ]);

        return matchedUsers.map((user) => ({
            user,
            status: statuses[user.id]?.status ?? "none",
            requestId: statuses[user.id]?.requestId ?? null,
            booksRead: booksReadCounts[user.id] ?? 0,
        }));
    } catch (error){
        console.error(error);
        return [];
    }
}
