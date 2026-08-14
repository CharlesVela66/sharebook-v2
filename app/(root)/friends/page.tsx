import { Button } from "@/components/ui/button";
import FriendsTabs from "@/features/Users/Friends/components/FriendsTabs";
import { Copy, UserRoundPlus } from "lucide-react";

export default function FriendsPage(){
    return (
        <section className="flex flex-col space-y-4">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-secondary">My friends</h1>
                <div className="flex gap-3">
                    <Button variant="outline" className="flex gap-2 p-5 text-secondary hover:text-secondary font-medium hover:bg-secondary/10">
                        <Copy className="w-6 h-6"/>
                        Copy profile link
                    </Button>
                    <Button className="flex gap-2 p-5 bg-secondary font-medium hover:bg-secondary/90">
                        <UserRoundPlus className="w-6 h-6" />
                        Add friends
                    </Button>
                </div>
            </div>
            <FriendsTabs />
        </section>
    )
}