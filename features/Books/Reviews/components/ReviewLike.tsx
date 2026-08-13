"use client"

import { Button } from "@/components/ui/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateReviewLike } from "../services/book.reviews.services";

interface ReviewLikeProps {
    bookId: string;
    reviewId: string;
}

export default function ReviewLike({ bookId, reviewId } : ReviewLikeProps) {
    const [loading, setLoading] = useState<boolean>();

    async function handleSubmit(value: boolean){
        try {
            setLoading(true);
            const response = await updateReviewLike(reviewId, bookId, value);
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            toast.success(response.message);
        } catch(error){
            console.error(error);
            toast.error(`Error ${value ? "liking" : "disliking"} this review. Try again.`)
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-1">
            <Button
                type="button" 
                variant="ghost" 
                size="icon-sm" 
                className="hover:bg-transparent dark:hover:bg-transparent"
                disabled={loading}
                onClick={() => handleSubmit(true)}
            >
                <ThumbsUpIcon />
            </Button>
            <Button 
                type="button" 
                variant="ghost" 
                size="icon-sm" 
                className="hover:bg-transparent dark:hover:bg-transparent"
                disabled={loading}
                onClick={() => handleSubmit(false)}
            >
                <ThumbsDownIcon />
            </Button>
        </div>
    )
}