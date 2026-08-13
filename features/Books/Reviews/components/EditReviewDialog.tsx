"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import EditReviewButton from "./EditReviewButton";
import { ReviewCardData } from "../types/book.reviews.types";
import { useState } from "react";
import { updateBookReview } from "../services/book.reviews.services";

interface EditReviewProps {
    bookId: string
    review: ReviewCardData;
}

export default function EditReviewDialog({ bookId, review } : EditReviewProps) {
    const [reviewContent, setReviewContent] = useState<string>(review.review);
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleEdit(e: React.SubmitEvent<HTMLFormElement>){
        e.preventDefault();
        try {
            setLoading(true);
            const response = await updateBookReview(bookId, review.id, reviewContent);
            if (!response.success){
                toast.error(response.message);
                return;
            }
            toast.success(response.message);
            setOpen(false);
        } catch(error){
            console.error(error);
            toast.error("Error editing the review. Try again.")
        } finally{
            setLoading(false);
        }
    }

      return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form id="edit-review-form" onSubmit={handleEdit}>
                <DialogTrigger render={<EditReviewButton />} />
                <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle className="text-secondary text-xl font-normal">Edit book review</DialogTitle>
                </DialogHeader>
                <FieldGroup>
                    <Textarea 
                        value={reviewContent}
                        onChange={(e) => setReviewContent(e.target.value)}
                    />
                </FieldGroup>
                <DialogFooter className="bg-background">
                    <DialogClose render={<Button variant="outline">Cancel</Button>} />
                    <Button form="edit-review-form" type="submit" disabled={loading || reviewContent === ""}>{loading ? "Updating" : "Update"}</Button>
                </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}