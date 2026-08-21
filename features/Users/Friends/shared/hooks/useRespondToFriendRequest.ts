"use client"

import { useState } from "react";
import { toast } from "sonner";
import { respondToFriendRequest } from "../../Requests/services/user.friend.requests.services";

interface PendingResponse {
    id: string;
    accept: boolean;
}

export function useRespondToFriendRequest(onSuccess?: (accept: boolean) => void){
    const [pending, setPending] = useState<PendingResponse | null>(null);

    async function respond(requestId: string, accept: boolean){
        setPending({ id: requestId, accept });
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
        } finally {
            setPending(null);
        }
    }

    return { respond, pending };
}
