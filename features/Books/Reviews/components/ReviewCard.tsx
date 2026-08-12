import { Button } from "@/components/ui/button";
import UserAvatar from "@/features/Users/components/UserAvatar";
import { PencilIcon, ThumbsDownIcon, ThumbsUpIcon, Trash2Icon } from "lucide-react";
import { ReviewCardData } from "../types/book.reviews.types";

const actionButtonClassName = "hover:bg-transparent dark:hover:bg-transparent";

export function ReviewCard({ review } : { review : ReviewCardData }) {
    const { user } = review;

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
                <div className="flex gap-1">
                    <Button type="button" variant="ghost" size="icon-sm" className={actionButtonClassName}>
                        <PencilIcon />
                    </Button>
                    <Button type="button" variant="ghost" size="icon-sm" className={actionButtonClassName}>
                        <Trash2Icon />
                    </Button>
                </div>
            </div>
            <p className="text-secondary font-normal">{review.review}</p>
            <div className="flex gap-1">
                <Button type="button" variant="ghost" size="icon-sm" className={actionButtonClassName}>
                    <ThumbsUpIcon />
                </Button>
                <Button type="button" variant="ghost" size="icon-sm" className={actionButtonClassName}>
                    <ThumbsDownIcon />
                </Button>
            </div>
        </div>
    )
}
