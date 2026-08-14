"use client"

import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchInput(){
    const [query, setQuery] = useState("")
    const router = useRouter()

    const handleRedirect = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter"){
            const q = query.replaceAll(" ", "+");
            router.push(`http://localhost:3000/discovery?q=${q}`)
            setQuery("");
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setQuery(newValue);
    };

    return (
        <InputGroup className="w-full sm:max-w-1/2 sm:min-w-1/3 bg-background/20 font-semibold px-1 py-2 sm:py-4.5 border-0">
            <InputGroupInput type="text" placeholder="Search books, authors, ISBN..." className="text-cards placeholder:text-cards/60 text-sm sm:text-base" onKeyDown={handleRedirect} onChange={handleChange} autoComplete="off" value={query}/>
            <InputGroupAddon>
                <Search className="text-cards"/>
            </InputGroupAddon>
        </InputGroup>
    )
}