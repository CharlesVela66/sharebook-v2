import { Bell } from "lucide-react";
import SearchInput from "./search/SearchInput";
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import { auth } from "@/auth";
import { Button } from "./ui/button";
import { getUserByEmail } from "@/features/Users/services/user.services";

export default async function Navbar(){
    const session = await auth();
    const user = await getUserByEmail(session?.user.email);

    return (
        <nav className="w-full bg-secondary flex justify-between py-3 px-8">
            <div className="w-full flex gap-10">
                <Link href="/" className="font-bold text-3xl text-primary">sharebook</Link>
                <SearchInput />
            </div>
            <div className="flex items-center gap-8">
                <Bell className="text-background w-5 h-5"/>
                {user ? (
                    <ProfileIcon user={user}/>
                ) : (
                    <Button>Login</Button>
                )}
            </div>
        </nav>
    )
}