"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps } from "react";

export default function ProfileStatButton({
    userId,
    className,
    ...props
}: { userId: string } & ComponentProps<typeof Button>) {
    const router = useRouter();

    return (
        <Button className={cn(`flex gap-2 p-5 bg-secondary font-medium hover:bg-secondary/90`, className)}
            onClick={() => router.push(`/user/${userId}/stats`)}
            {...props}
        >
            <Plus className="w-6 h-6" />
            More insights
        </Button>
    )
}