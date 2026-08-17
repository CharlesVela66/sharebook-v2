import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getFriendRequests, getFriends } from "../services/user.friends.services";
import FriendCard from "./FriendCard";
import FriendRequestCard from "./FriendRequestCard";

export default async function FriendsTabs(){
    
    const [friends, friendRequests] = await Promise.all([
        getFriends(),
        getFriendRequests(),
    ])

    return (
        <Tabs defaultValue="account" className="w-full space-y-4">
            <div className="w-75">
                <TabsList variant="line" className="w-full">
                    <TabsTrigger value="friends">Friends ({friends.length})</TabsTrigger>
                    <TabsTrigger value="requests" className="gap-1.5">
                        Requests
                        {friendRequests.length > 0 && (
                            <Badge variant="destructive">{friendRequests.length}</Badge>
                        )}
                    </TabsTrigger>
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
                {friendRequests && friendRequests.length > 0 ? (
                    <div className="grid grid-cols-3">
                        {friendRequests.map((request) => (
                            <FriendRequestCard key={request.sender.id} request={request}/>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-muted text-sm font-normal">You haven&apos;t received any friend requests!</p>
                )}
            </TabsContent>
        </Tabs>
    )
}