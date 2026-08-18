"use client"

import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { unstable_rethrow } from "next/navigation";
import UserAvatar from "@/features/Users/components/UserAvatar";
import { toast } from "sonner";
import { logout } from "@/features/Auth/Logout/services/auth.logout.services";
import { SafeUser } from "@/features/Auth/shared/types/auth.types";

export default function ProfileIcon({user} : {user: SafeUser}){

    async function handleLogout() {
        try {
            await logout();
            toast.success("Successfully logged out.");
        } catch(error){
            unstable_rethrow(error);
            console.error(error);
            toast.error("Error logging out. Try again.")
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button className="rounded-full w-8 h-8 p-0 cursor-pointer" />}>
                <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                    <Link href={`/user/${user.id}`}>
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <Link href="/friends">
                        <DropdownMenuItem>My friends</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}