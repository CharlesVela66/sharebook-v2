import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";

export default function SearchInput(){
    return (
        <InputGroup className="w-1/3 bg-background/20 font-semibold px-1 py-4.5 border-0">
            <InputGroupInput type="text" placeholder="Search books, authors, ISBN..." className="text-cards placeholder:text-cards/60"/>
            <InputGroupAddon>
                <Search className="text-cards"/>
            </InputGroupAddon>
        </InputGroup>
    )
}