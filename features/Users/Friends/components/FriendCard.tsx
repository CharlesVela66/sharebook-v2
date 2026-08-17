import { Card, CardContent } from "@/components/ui/card";
import { FriendData } from "../types/user.friends.types";
import UserAvatar from "../../components/UserAvatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FriendCardProps {
    friend: FriendData;
}

export default function FriendCard({ friend } : FriendCardProps){
    return(
        <Card className="bg-card p-3">
            <CardContent className="flex flex-col items-center space-y-1">
                <UserAvatar user={friend.friend} className="size-14 text-4xl"/>
                <p className="font-medium text-secondary text-md">{friend.friend.first_name} {friend.friend.last_name}</p>
                <p className="text-xs text-muted font-normal">{friend.createdAt ? `Since ${friend.createdAt.getFullYear()}`  :""}</p>
                <Link href={`/user/${friend.friend.id}`} className="w-full">
                    <Button variant="outline" className="text-secondary font-medium w-full hover:bg-secondary/10 cursor-pointer">
                        View profile
                    </Button>
                </Link>
            </CardContent>
        </Card>
    )
}