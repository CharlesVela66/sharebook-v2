import SearchInput from "./search/SearchInput";

export default function Navbar(){
    return (
        <nav className="w-full bg-secondary flex justify-between py-3 px-8">
            <div className="flex gap-10">
                <span className="font-bold text-3xl text-primary">sharebook</span>
                <SearchInput />
            </div>
            <div>
                Profile
            </div>
        </nav>
    )
}