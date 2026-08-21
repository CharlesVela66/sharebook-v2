import { MessageSquare } from "lucide-react";
import EmptyState from "@/components/EmptyState";
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
                <EmptyState
                    icon={MessageSquare}
                    title="No reviews yet"
                    description="This book doesn't have any reviews yet. Be the first one to post a review!"
                />
            )}
        </div>
    )
}