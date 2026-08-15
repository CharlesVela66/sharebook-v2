"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import AddFriendsButton from "./AddFriendsButton";
import { useState } from "react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { searchFriends } from "@/features/Users/Friends/services/user.friends.services";
import { FriendSearchResult } from "@/features/Users/Friends/types/user.friends.types";
import FriendSearchCard from "../FriendSearchCard";

export default function AddFriendsDialog(){
    const [open, setOpen] = useState<boolean>(false);
    const [user, setUser] = useState<string>("");
    const [results, setResults] = useState<FriendSearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function fetchUsers(e: React.KeyboardEvent<HTMLInputElement>){
        if (e.key !== "Enter") return;
        e.preventDefault();
        setLoading(true);
        try {
            const response = await searchFriends(user);
            setResults(response);
            if (response.length === 0) toast.warning("No users found.");
        } catch(error){
            console.error(error);
            toast.error("Error searching for users. Try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={<AddFriendsButton />} />
            <DialogContent className="sm:max-w-sm bg-background">
                <DialogHeader>
                    <DialogTitle className="text-secondary text-xl font-normal">Add friends</DialogTitle>
                    <DialogDescription className="text-muted text-sm mb-3">Search by name to send a friend request.</DialogDescription>
                </DialogHeader>
                <InputGroup className="w-full bg-background/20 font-semibold py-2 border-0">
                    <InputGroupInput type="text" placeholder="Search for users and hit enter" className="text-secondary text-base" onKeyDown={fetchUsers} onChange={(e) => setUser(e.target.value)} autoComplete="off" value={user} disabled={loading}/>
                    <InputGroupAddon>
                        {loading ? <Loader2 className="text-cards animate-spin"/> : <Search className="text-cards"/>}
                    </InputGroupAddon>
                </InputGroup>
                {loading ? (
                    <p className="text-center text-muted text-sm font-normal">Searching...</p>
                ) : results.length > 0 && (
                    <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                        {results.map((result) => (
                            <FriendSearchCard key={result.user.id} result={result} />
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}