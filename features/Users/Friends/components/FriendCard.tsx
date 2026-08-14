import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FriendData } from "../types/user.friends.types";

interface FriendCardProps {
    friend: FriendData;
}

export default function FriendCard({ friend } : FriendCardProps){
    return(
        <Card className="bg-card">
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <p>{friend.friend.first_name}</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}