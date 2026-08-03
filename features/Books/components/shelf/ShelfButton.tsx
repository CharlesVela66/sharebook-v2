import { Button } from "@/components/ui/button";
import { Shelf } from "@/db/schema";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusIcon } from "lucide-react";
import { ComponentProps } from "react";

export default function ShelfButton({
    shelf,
    className,
    ...props
}: { shelf: Shelf | null; } & ComponentProps<typeof Button>) {

    return (
        <Button
            className={cn(`flex w-fit py-6 px-5 text-md font-semibold ${shelf === "Want to read"
                ? "border border-secondary bg-transparent text-secondary hover:bg-secondary/10"
                : shelf === "Currently reading"
                ? "bg-secondary hover:bg-secondary/90"
                : shelf === "Read"
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-secondary hover:bg-secondary/90"}`, className)}
            {...props}
        >   
            <CheckIcon className={shelf === "Read" ? "" : "hidden"}/>
            <PlusIcon className={shelf ? "hidden" : ""}/>
            {shelf ? shelf : "Add to shelf"}
        </Button>
    )
}