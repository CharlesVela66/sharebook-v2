import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserRoundPlus } from "lucide-react";
import { ComponentProps } from "react";

export default function AddFriendsButton({
    className,
    ...props
}: ComponentProps<typeof Button>) {

    return (
        <Button className={cn(`flex gap-2 p-5 bg-secondary font-medium hover:bg-secondary/90`, className)}
            {...props}
        >
            <UserRoundPlus className="w-6 h-6" />
            Add friends
        </Button>
    )
}