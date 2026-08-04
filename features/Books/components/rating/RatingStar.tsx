"use client"

import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { useState } from "react";

interface RatingStarProps {
    rating: number;
    onRatingChange: (data: number) => void;
}

export default function RatingStar( { rating, onRatingChange } : RatingStarProps) {
    const [stars, setStars] = useState<number>(rating);

    const handleRating = (index: number) => {
         setStars(index);
         onRatingChange(index);
    }

    return (
        <div className="flex flex-col space-y-1 px-4 my-4">
            <div className="flex justify-between items-center gap-1 px-4 my-2">
                {[...Array(5)].map((_, index) => (
                    <Button
                        key={index}
                        type="button"
                        variant="ghost"
                        aria-label={`Rate ${index + 1} out of 5`}
                        onClick={() => handleRating(index + 1)}
                        className="hover:bg-transparent"
                    >
                        <StarIcon className={index < stars ? "size-8 text-primary fill-primary hover:bg-transparent" : "size-8 text-muted bg-background hover:bg-transparent"} />
                    </Button>
                ))}
            </div>
            <p className="text-xs text-muted flex justify-center">{stars} out of 5</p>
        </div>
    )
}