import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PencilIcon } from "lucide-react";
import { ComponentProps } from "react";

export default function EditReviewButton({
    className,
    ...props
}: ComponentProps<typeof Button>) {
    return (
        <Button type="button" variant="ghost" size="icon-sm" 
        className={cn("hover:bg-transparent dark:hover:bg-transparent", className)}
        {...props}>
            <PencilIcon />
        </Button>
    )
}