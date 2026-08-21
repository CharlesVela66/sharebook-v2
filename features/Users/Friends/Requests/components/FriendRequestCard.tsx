"use client"

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { FriendRequestData } from "../../types/user.friends.types";
import UserAvatar from "../../../components/UserAvatar";
import { formatSentAgo } from "@/lib/utils";
import { useRespondToFriendRequest } from "../../shared/hooks/useRespondToFriendRequest";
import FriendRequestActions from "../../shared/components/FriendRequestActions";

interface FriendRequestCardProps {
    request: FriendRequestData;
}

export default function FriendRequestCard({ request } : FriendRequestCardProps){
    const router = useRouter();
    const { respond, pending } = useRespondToFriendRequest(() => router.refresh());
    const isPending = pending?.id === request.id;

    return(
        <Card className="bg-card p-3">
            <CardContent className="flex flex-col items-center space-y-1">
                <UserAvatar user={request.sender} className="size-14 text-4xl"/>
                <p className="font-medium text-secondary text-md">{request.sender.first_name} {request.sender.last_name}</p>
                <p className="text-xs text-muted font-normal">{request.createdAt ? formatSentAgo(request.createdAt) : ""}</p>
                <div className="w-full flex gap-3 items-center">
                    <FriendRequestActions
                        size="sm"
                        buttonClassName="flex-1"
                        pending={isPending}
                        pendingAction={isPending ? (pending.accept ? "accept" : "reject") : undefined}
                        onAccept={() => respond(request.id, true)}
                        onReject={() => respond(request.id, false)}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
