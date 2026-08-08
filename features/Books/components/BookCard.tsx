import { type BookCard } from "../types/book.types";
import Image from "next/image";
import Link from "next/link";
import ShelfDialogTrigger from "../Shelves/components/ShelfDialogTrigger";
import { getUserBookShelf } from "../Shelves/services/book.shelves.services";

export default async function BookCard({book} : {book : BookCard}){
    const shelf = await getUserBookShelf(book.work_id);

    return (
        <Link href={`/book/${book.work_id}`} className="w-full flex py-4 px-6 justify-between bg-card rounded-lg border border-border-strong cursor-pointer">
            <div className="flex gap-10">
                <Image 
                    src={book.image_url}
                    alt={book.title}
                    width={80}
                    height={128}
                    className="h-32 w-20"
                />
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl text-secondary font-bold">{book.title}</h2>
                    <p className="text-md text-secondary font-normal">{book.author}</p>
                </div>
            </div>
            <div className="flex justify-center items-center w-fit">
                <ShelfDialogTrigger book={book} shelf={shelf}/>
            </div>
        </Link>
    )
}