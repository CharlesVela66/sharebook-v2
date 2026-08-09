import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function EditProfileButton({
    className,
    ...props
}: ComponentProps<typeof Button>) {

    return (
        <Button
            className={cn("bg-secondary text-sm w-fit py-4 px-3 border border-border-strong hover:bg-secondary/90", className)}
            {...props}
        >   
            Edit Profile
        </Button>
    )
}