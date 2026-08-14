import { type BookCard } from "../types/book.types";
import Image from "next/image";
import Link from "next/link";
import ShelfDialogTrigger from "../Shelves/components/ShelfDialogTrigger";
import { getUserBookShelf } from "../Shelves/services/book.shelves.services";
import { getBookRatings } from "../Ratings/services/book.ratings.services";

export default async function BookCard({book} : {book : BookCard}){
    const [shelf, bookRating] = await Promise.all([
        getUserBookShelf(book.work_id),
        getBookRatings(book.work_id),
    ]);

    return (
        <Link href={`/book/${book.work_id}`} className="w-full flex flex-col space-y-3 sm:flex-row py-4 px-6 justify-between bg-card rounded-lg border border-border-strong cursor-pointer">
            <div className="flex gap-10">
                <Image 
                    src={book.image_url}
                    alt={book.title}
                    width={80}
                    height={160}
                    className="h-32 w-20"
                />
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-xl text-secondary font-bold">{book.title}</h2>
                        <p className="text-md text-secondary font-normal">{book.author}</p>
                    </div>
                    <p className="text-muted font-medium text-sm">
                        {bookRating && !isNaN(bookRating.average) ? (bookRating.average / 10).toFixed(1) : "No rating"} - {bookRating?.count ?? 0} Ratings
                    </p>
                </div>
            </div>
            <div className="flex justify-center items-center w-fit">
                <ShelfDialogTrigger book={book} shelf={shelf}/>
            </div>
        </Link>
    )
}