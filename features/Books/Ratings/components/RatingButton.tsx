import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { ComponentProps } from "react";

export default function RatingButton({
    className,
    ...props
}: ComponentProps<typeof Button>) {

    return (
        <Button
            className={cn("text-secondary text-md w-fit py-6 px-5 border border-border-strong hover:bg-secondary/10", className)}
            {...props}
            variant="outline"
        >   
            <StarIcon />
            Rate
        </Button>
    )
}