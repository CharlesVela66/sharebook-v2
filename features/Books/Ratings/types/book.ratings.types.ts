export type UpdateBookRatingProps = {
    rating: number;
    bookId: string;
}

export type RatingData = {
    count: number;
    average: number;
    allRatings: RatingUserData[];
}

export type RatingUserData = {
    userId: string;
    rating: number;
}