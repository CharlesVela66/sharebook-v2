import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFriends } from "../services/user.friends.services";
import FriendCard from "./FriendCard";

export default async function FriendsTabs(){

    const friends = await getFriends();

    return (
        <Tabs defaultValue="account" className="w-full">
            <div className="w-75">
                <TabsList variant="line" className="w-full">
                    <TabsTrigger value="friends">Friends</TabsTrigger>
                    <TabsTrigger value="requests">Requests</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="friends" className="w-full">
                {friends && friends.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {friends.map((friend) => (
                            <FriendCard key={friend.friend.id} friend={friend}/>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted text-sm font-normal">You haven&apos;t added any friends yet!</p>
                )}
            </TabsContent>
            <TabsContent value="requests">
                {friends && friends.length > 0 ? (
                    <div className="grid grid-cols-3">
                        {friends.map((friend) => (
                            <FriendCard key={friend.friend.id} friend={friend}/>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted text-sm font-normal">You haven&apos;t received any friend requests!</p>
                )}
            </TabsContent>
        </Tabs>
    )
}