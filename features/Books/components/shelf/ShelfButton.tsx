import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { ComponentProps } from "react";

export default function ShelfButton({ className, ...props }: ComponentProps<typeof Button>){
    return (
        <Button
            className={cn("flex bg-secondary w-fit py-6 px-5 text-md font-semibold hover:bg-secondary/90", className)}
            {...props}
        >
            <PlusIcon />
            Add to shelf
        </Button>
    )
}