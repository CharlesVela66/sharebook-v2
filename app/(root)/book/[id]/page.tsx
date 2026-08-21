import { Separator } from "@/components/ui/separator";
import { getBookDetailsApi } from "@/features/Books/api/book.api";
import RatingDialog from "@/features/Books/Ratings/components/RatingDialog";
import { getBookRatings, getUserBookRating } from "@/features/Books/Ratings/services/book.ratings.services";
import { ReviewSection } from "@/features/Books/Reviews/components/ReviewSection";
import { getBookReviews } from "@/features/Books/Reviews/services/book.reviews.services";
import ShelfDialog from "@/features/Books/Shelves/components/ShelfDialog";
import { getUserBookShelf } from "@/features/Books/Shelves/services/book.shelves.services";
import Image from "next/image";

export default async function BookIdPage({
    params
}: {params: Promise<{id: string}>}){
    const { id } = await params;

    const [book, shelf, rating, bookRating, reviews] = await Promise.all([
        getBookDetailsApi(id),
        getUserBookShelf(id),
        getUserBookRating(id),
        getBookRatings(id),
        getBookReviews(id),
    ]);

    const stats = [
        {
            label: "pages",
            value: book.page_count
        },
        {
            label: "published",
            value: book.year
        },
        {
            label: "genre",
            value: book.genre
        }
    ]

    return (
        <section className="w-full flex flex-col gap-9">
            <div className="flex gap-6">
                <Image 
                    src={book.image_url || "/book-placeholder.svg"}
                    alt={book.title}
                    height={320}
                    width={216}
                    className="w-32 h-48 sm:w-54 sm:h-80 rounded-md"
                />
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-secondary text-4xl font-bold">{book.title}</h2>
                        <span className="text-secondary text-2xl font-normal">{book.author}</span>
                        <div className="flex gap-10">
                            <p className="text-secondary font-medium">{bookRating && !isNaN(bookRating.average) ? (bookRating.average / 10).toFixed(1) : "No rating"}</p>
                            <p className="text-muted font-light">{bookRating?.count ?? 0} ratings - {reviews?.length ?? 0} reviews</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <ShelfDialog book={book} shelf={shelf}/>
                        <RatingDialog book={book} bookRating={rating}/>
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                {stats.map((stat) => stat.value && (
                    <div key={stat.label} className="flex flex-col justify-between items-center w-full max-w-1/3 p-4 rounded-lg bg-primary/30 text-yellow-700">
                        <span className="text-xl font-semibold">{stat.value}</span>
                        <span className="text-lg">{stat.label}</span>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-3">
                <h4 className="text-secondary font-semibold text-2xl">Synopsis</h4>
                <p className="text-secondary">{book.description || "No description available for this book."}</p>
            </div>
            <Separator />
            <div className="flex flex-col gap-3">
                <h4 className="text-secondary font-semibold text-2xl">Reviews</h4>
                <ReviewSection bookId={id} reviews={reviews}/>
            </div>
        </section>
    )
}