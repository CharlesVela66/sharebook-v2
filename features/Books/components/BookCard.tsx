import { Button } from "@/components/ui/button";
import { type BookCard } from "../types/book.types";
import Image from "next/image";
import Link from "next/link";

export default function BookCard({book} : {book : BookCard}){
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
                <Button className="bg-primary text-black cursor-pointer">
                    Want to read
                </Button>
            </div>
        </Link>
    )
}