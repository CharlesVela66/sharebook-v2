import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FriendRequestActionsProps {
    onAccept: () => void;
    onReject: () => void;
    size?: "sm" | "icon-sm";
    buttonClassName?: string;
}

export default function FriendRequestActions({ onAccept, onReject, size = "sm", buttonClassName }: FriendRequestActionsProps){
    return (
        <>
            <Button size={size} onClick={onAccept} className={cn("bg-primary hover:bg-primary/90", buttonClassName)}>
                <Check />
            </Button>
            <Button size={size} variant="outline" onClick={onReject} className={buttonClassName}>
                <X />
            </Button>
        </>
    )
}
