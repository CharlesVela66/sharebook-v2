import { User } from "@/db/schema";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import UserAvatar from "@/features/Users/components/UserAvatar";

export default function ProfileIcon({user} : {user: User}){
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button className="rounded-full w-8 h-8 p-0 cursor-pointer" />}>
                <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                    <DropdownMenuItem>
                        <Link href={`/user/${user.id}`}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>My friends</DropdownMenuItem>
                    <DropdownMenuItem>My books</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}