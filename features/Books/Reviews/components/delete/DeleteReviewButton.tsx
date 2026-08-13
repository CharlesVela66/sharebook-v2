import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2Icon } from "lucide-react";
import { ComponentProps } from "react";

export default function DeleteReviewButton({
    className,
    ...props
}: ComponentProps<typeof Button>) {
    return (
        <Button type="button" variant="ghost" size="icon-sm" 
        className={cn("hover:bg-transparent dark:hover:bg-transparent", className)}
        {...props}>
            <Trash2Icon />
        </Button>
    )
}