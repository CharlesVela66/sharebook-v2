"use client"

import { useEffect } from "react";
import { WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/EmptyState";

export default function BookError({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <EmptyState
            icon={WifiOff}
            title="We're having trouble loading this book"
            description="Something went wrong while fetching this book's details. Please check your connection and try again."
            action={
                <Button variant="outline" className="text-secondary hover:text-secondary font-medium hover:bg-secondary/10" onClick={() => unstable_retry()}>
                    Try again
                </Button>
            }
        />
    );
}
