"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react";
import { toast } from "sonner";
import { createBookReview } from "../services/book.reviews.services";

interface CreateReviewProps {
    bookId: string;
}

export function CreateReview({ bookId } : CreateReviewProps) {

    const [review, setReview] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        if (review === "" || !review) {
            toast.warning("Please type a review before submitting");
            return;
        }
        try {
            setLoading(true);
            const result = await createBookReview(
                bookId,
                review,
            );
            if (!result.success) {
                toast.error(result.message);
                return;
            }
            toast.success(result.message);
            setReview("");
        } catch (error) {
            console.error(error);
            toast.error("Error at submitting ")
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Textarea 
                placeholder="Type your review here"
                value={review}
                onChange={(e) => setReview(e.target.value)}
            />
            <div className="flex justify-end">
                <Button type="submit" className="w-fit" disabled={loading || !review}>{loading ? "Submitting..." : "Submit review"}</Button>
            </div>
        </form>
    )
}