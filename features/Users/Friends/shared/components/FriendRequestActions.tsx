import { Button } from "@/components/ui/button";
import { Check, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FriendRequestActionsProps {
    onAccept: () => void;
    onReject: () => void;
    size?: "sm" | "icon-sm";
    buttonClassName?: string;
    pending?: boolean;
    pendingAction?: "accept" | "reject";
}

export default function FriendRequestActions({ onAccept, onReject, size = "sm", buttonClassName, pending = false, pendingAction }: FriendRequestActionsProps){
    return (
        <>
            <Button size={size} onClick={onAccept} disabled={pending} className={cn("bg-primary hover:bg-primary/90", buttonClassName)}>
                {pendingAction === "accept" ? <Loader2 className="animate-spin" /> : <Check />}
            </Button>
            <Button size={size} variant="outline" onClick={onReject} disabled={pending} className={buttonClassName}>
                {pendingAction === "reject" ? <Loader2 className="animate-spin" /> : <X />}
            </Button>
        </>
    )
}
