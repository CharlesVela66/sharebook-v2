"use client"

import { toast } from "sonner";
import { useState } from "react";
import { ReviewCardData } from "../../types/book.reviews.types";
import DeleteReviewButton from "./DeleteReviewButton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { deleteBookReview } from "../../services/book.reviews.services";

interface DeleteReviewProps {
    bookId: string
    review: ReviewCardData;
}

export default function DeleteReviewDialog({ bookId, review } : DeleteReviewProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleDelete(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            setLoading(true);
            const response = await deleteBookReview(bookId, review.id);
            if (!response.success){
                toast.error(response.message);
                return;
            }
            toast.success(response.message);
            setOpen(false);
        } catch(error){
            console.error(error);
            toast.error("Error deleting the review. Try again.")
        } finally{
            setLoading(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <form id="delete-review-form" onSubmit={handleDelete}>
                <AlertDialogTrigger render={<DeleteReviewButton />} />
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this review.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="bg-background">
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction form="delete-review-form" type="submit" disabled={loading} className="bg-secondary hover:bg-secondary/90">{loading ? "Deleting" : "Delete"}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </form>
        </AlertDialog>
    )
}