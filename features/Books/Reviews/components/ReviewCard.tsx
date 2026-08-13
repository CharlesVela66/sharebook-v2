import UserAvatar from "@/features/Users/components/UserAvatar";
import { ReviewCardData } from "../types/book.reviews.types";
import ReviewLike from "./ReviewLike";
import ReviewActions from "./ReviewActions";
import { getReviewLikes } from "../services/book.reviews.services";
import { auth } from "@/auth";

interface ReviewCardProps {
    bookId: string;
    review: ReviewCardData;
}

export async function ReviewCard({ bookId, review } : ReviewCardProps ) {
    const { user } = review;

    const session = await auth();

    const reviewLikes = await getReviewLikes(review.id);

    const userLike = session?.user
        ? reviewLikes.find((like) => like.user_id === session.user.id)?.is_like ?? null
        : null;

    const formattedDate = review.updated_at
        ? new Date(review.updated_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
        : null;

    return (
        <div className="w-full flex flex-col gap-3 py-4 px-6 bg-card rounded-lg border border-border-strong">
            <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                    <UserAvatar user={user} />
                    <div className="flex flex-col">
                        <span className="text-secondary font-bold">{user.first_name} {user.last_name}</span>
                        {formattedDate && <span className="text-muted text-sm font-normal">{formattedDate}</span>}
                    </div>
                </div>
                <ReviewActions />
            </div>
            <p className="text-secondary font-normal">{review.review}</p>
            <ReviewLike bookId={bookId} reviewId={review.id} reviewLikes={reviewLikes} userLike={userLike}/>
        </div>
    )
}
