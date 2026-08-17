"use client"

import { useState } from "react";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/features/Users/components/UserAvatar";
import { toast } from "sonner";
import { Clock, UserRoundPlus } from "lucide-react";
import { FriendSearchResult, FriendStatus } from "../types/user.friends.types";
import { sendFriendRequest } from "../Requests/services/user.friend.requests.services";
import { useRespondToFriendRequest } from "../shared/hooks/useRespondToFriendRequest";
import FriendRequestActions from "../shared/components/FriendRequestActions";

interface FriendSearchCardProps {
    result: FriendSearchResult;
}

export default function FriendSearchCard({ result }: FriendSearchCardProps){
    const { user, booksRead } = result;
    const [status, setStatus] = useState<FriendStatus>(result.status);
    const [requestId, setRequestId] = useState<string | null>(result.requestId);

    const { respond } = useRespondToFriendRequest((accept) => {
        setStatus(accept ? "friends" : "none");
        setRequestId(null);
    });

    async function handleSendRequest(){
        try {
            const result = await sendFriendRequest(user.id);
            if (!result.success){
                toast.error(result.message);
                return;
            }
            toast.success(result.message);
            setStatus("pending_sent");
        } catch (error){
            console.error(error);
            toast.error("Error sending friend request. Try again.");
        }
    }

    return (
        <Card size="sm" className="bg-card flex-row items-center justify-between">
            <CardContent className="flex items-center gap-3">
                <UserAvatar user={user} />
                <div className="flex flex-col">
                    <p className="text-sm font-medium text-secondary">{user.first_name} {user.last_name}</p>
                    <p className="text-xs text-muted font-light">{booksRead} book{booksRead === 1 ? "" : "s"} read</p>
                </div>
            </CardContent>
            <CardAction className="flex items-center gap-2 pr-(--card-spacing)">
                {status === "none" && (
                    <Button size="sm" onClick={handleSendRequest} className="bg-secondary hover:bg-secondary/90">
                        <UserRoundPlus />
                        Add
                    </Button>
                )}
                {status === "pending_sent" && (
                    <Button size="sm" variant="outline" disabled>
                        <Clock />
                        Pending
                    </Button>
                )}
                {status === "pending_received" && requestId && (
                    <FriendRequestActions
                        size="icon-sm"
                        onAccept={() => respond(requestId, true)}
                        onReject={() => respond(requestId, false)}
                    />
                )}
                {status === "friends" && (
                    <span className="text-xs text-muted">Friends</span>
                )}
            </CardAction>
        </Card>
    )
}
