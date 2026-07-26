import { Input } from "../ui/input";

export default function SearchInput(){
    return (
        <Input type="text" placeholder="Search books, authors, ISBN..." className="bg-background/20 font-semibold text-cards placeholder:text-cards/60 w-1/3 px-3 py-4.5 border-0"/>
    )
}