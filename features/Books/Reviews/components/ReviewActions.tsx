import { ReviewCardData } from "../types/book.reviews.types";
import DeleteReviewDialog from "./delete/DeleteReviewDialog";
import EditReviewDialog from "./edit/EditReviewDialog";

interface ReviewActionsProps {
    bookId: string;
    review: ReviewCardData
}

export default function ReviewActions({ bookId, review } : ReviewActionsProps) {
    return (
        <div className="flex gap-1">
            <EditReviewDialog bookId={bookId} review={review}/>
            <DeleteReviewDialog bookId={bookId} review={review} />
        </div>
    )
}