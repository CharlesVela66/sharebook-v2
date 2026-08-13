"use client"

import { Button } from "@/components/ui/button";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { updateReviewLike } from "../services/book.reviews.services";
import { type ReviewLike } from "@/db/schema";

interface ReviewLikeProps {
    bookId: string;
    reviewId: string;
    reviewLikes: ReviewLike[];
    userLike: boolean | null;
}

export default function ReviewLike({ bookId, reviewId, reviewLikes, userLike } : ReviewLikeProps) {
    const [loading, setLoading] = useState<boolean>();
    const [currentLike, setCurrentLike] = useState<boolean | null>(userLike);

    const likes = reviewLikes.filter((like) => like.is_like).length;
    const dislikes = reviewLikes.length - likes;

    async function handleSubmit(value: boolean){
        if (currentLike === value) return;
        try {
            setLoading(true);
            const response = await updateReviewLike(reviewId, bookId, value);
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            setCurrentLike(value);
            toast.success(response.message);
        } catch(error){
            console.error(error);
            toast.error(`Error ${value ? "liking" : "disliking"} this review. Try again.`)
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-2">
            <Button
                type="button" 
                variant="ghost" 
                size="icon-sm" 
                className="flex gap-1 hover:bg-transparent dark:hover:bg-transparent"
                disabled={loading}
                onClick={() => handleSubmit(true)}
            >
                <ThumbsUpIcon className={currentLike === true ? "fill-secondary" : undefined} />
                <p>{likes}</p>
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="flex gap-1 hover:bg-transparent dark:hover:bg-transparent"
                disabled={loading}
                onClick={() => handleSubmit(false)}
            >
                <ThumbsDownIcon className={currentLike === false ? "fill-secondary" : undefined} />
                <p>{dislikes}</p>
            </Button>
        </div>
    )
}