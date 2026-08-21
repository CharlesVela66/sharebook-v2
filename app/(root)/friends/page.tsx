import { Button } from "@/components/ui/button";
import AddFriendsDialog from "@/features/Users/Friends/components/add/AddFriendsDialog";
import FriendsAccessDenied from "@/features/Users/Friends/components/FriendsAccessDenied";
import FriendsTabs from "@/features/Users/Friends/components/FriendsTabs";
import { Copy } from "lucide-react";
import { auth } from "@/auth";

export default async function FriendsPage(){
    const session = await auth();

    if (!session?.user){
        return <FriendsAccessDenied />;
    }

    return (
        <section className="flex flex-col space-y-4">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-secondary">My friends</h1>
                <div className="flex gap-3">
                    <Button variant="outline" className="flex gap-2 p-5 text-secondary hover:text-secondary font-medium hover:bg-secondary/10">
                        <Copy className="w-6 h-6"/>
                        <p className="hidden sm:block">Copy profile link</p>
                    </Button>
                    <AddFriendsDialog />
                </div>
            </div>
            <FriendsTabs />
        </section>
    )
}