import { ReviewCardData } from "../types/book.reviews.types";
import { CreateReview } from "./CreateReview";
import { ReviewCard } from "./ReviewCard";

interface ReviewSectionProps {
    bookId: string;
    reviews: ReviewCardData[] | null;
}

export function ReviewSection({ bookId, reviews } : ReviewSectionProps) {
    return (
        <div className="flex flex-col gap-3">
            <CreateReview bookId={bookId}/>
            {reviews && reviews.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} bookId={bookId} review={review} />
                    ))}
                </div>
            ) : (
                <p className="text-sm text-muted text-center">This book doesn&apos;t have any reviews yet. Be the first one to post a review!</p>
            )}
        </div>
    )
}