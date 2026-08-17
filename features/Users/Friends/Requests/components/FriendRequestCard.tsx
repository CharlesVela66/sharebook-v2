"use client"

import { Card, CardContent } from "@/components/ui/card";
import { FriendRequestData } from "../../types/user.friends.types";
import UserAvatar from "../../../components/UserAvatar";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { formatSentAgo } from "@/lib/utils";
import { respondToFriendRequest } from "../services/user.friend.requests.services";

interface FriendRequestCardProps {
    request: FriendRequestData;
}

export default function FriendRequestCard({ request } : FriendRequestCardProps){

    async function handleRespond(accept: boolean){
        try {
            const result = await respondToFriendRequest(request.id, accept);
            if (!result.success){
                toast.error(result.message);
                return;
            }
            toast.success(result.message);
        } catch (error){
            console.error(error);
            toast.error("Error responding to friend request. Try again.");
        }
    }

    return(
        <Card className="bg-card p-3">
            <CardContent className="flex flex-col items-center space-y-1">
                <UserAvatar user={request.sender} className="size-14 text-4xl"/>
                <p className="font-medium text-secondary text-md">{request.sender.first_name} {request.sender.last_name}</p>
                <p className="text-xs text-muted font-normal">{request.createdAt ? formatSentAgo(request.createdAt) : ""}</p>
                <div className="w-full flex gap-3 items-center">
                    <Button size="sm" onClick={() => handleRespond(true)} className="bg-primary hover:bg-primary/90 flex-1">
                        <Check />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleRespond(false)} className="flex-1">
                        <X />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}