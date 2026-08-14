import { Bell } from "lucide-react";
import SearchInput from "./search/SearchInput";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import { auth } from "@/auth";
import { getUserByEmail } from "@/features/Users/services/user.services";
import LoginButton from "./LoginButton";

export default async function Navbar(){
    const session = await auth();
    const user = await getUserByEmail(session?.user.email);

    return (
        <nav className="w-full bg-secondary flex items-center justify-between gap-3 py-3 px-4 sm:px-8">
            <div className="flex items-center gap-3 sm:gap-10 min-w-0 flex-1">
                <Link href="/" className="font-bold text-lg sm:text-3xl text-primary flex items-center shrink-0">sharebook</Link>
                <div className="min-w-0 flex-1">
                    <SearchInput />
                </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-8 shrink-0">
                <Bell className="text-background w-5 h-5 shrink-0"/>
                {user ? (
                    <ProfileIcon user={user}/>
                ) : (
                    <LoginButton />
                )}
            </div>
        </nav>
    )
}