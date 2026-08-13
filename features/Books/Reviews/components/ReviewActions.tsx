import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { ReviewCardData } from "../types/book.reviews.types";
import EditReviewDialog from "./EditReviewDialog";

interface ReviewActionsProps {
    bookId: string;
    review: ReviewCardData
}

export default function ReviewActions({ bookId, review } : ReviewActionsProps) {

    return (
        <div className="flex gap-1">
            <EditReviewDialog bookId={bookId} review={review}/>
            <Button type="button" variant="ghost" size="icon-sm" className="hover:bg-transparent dark:hover:bg-transparent">
                <Trash2Icon />
            </Button>
        </div>
    )
}