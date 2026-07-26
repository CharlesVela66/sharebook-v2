import { Bell } from "lucide-react";
import SearchInput from "./search/SearchInput";

export default function Navbar(){
    return (
        <nav className="w-full bg-secondary flex justify-between py-3 px-8">
            <div className="w-full flex gap-10">
                <span className="font-bold text-3xl text-primary">sharebook</span>
                <SearchInput />
            </div>
            <div className="flex items-center gap-8">
                <Bell className="text-background w-5 h-5"/>
                <div className="w-8 h-8 bg-muted rounded-full"/>
            </div>
        </nav>
    )
}