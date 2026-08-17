"use client"

import { toast } from "sonner";
import { respondToFriendRequest } from "../../Requests/services/user.friend.requests.services";

export function useRespondToFriendRequest(onSuccess?: (accept: boolean) => void){
    async function respond(requestId: string, accept: boolean){
        try {
            const result = await respondToFriendRequest(requestId, accept);
            if (!result.success){
                toast.error(result.message);
                return;
            }
            toast.success(result.message);
            onSuccess?.(accept);
        } catch (error){
            console.error(error);
            toast.error("Error responding to friend request. Try again.");
        }
    }

    return { respond };
}
