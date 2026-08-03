import { Button } from "@/components/ui/button";
import { getBookDetailsApi } from "@/features/Books/api/book.api";
import ShelfDialog from "@/features/Books/components/shelf/ShelfDialog";
import { Star } from "lucide-react";
import Image from "next/image";

export default async function BookIdPage({
    params
}: {params: Promise<{id: string}>}){
    const { id } = await params;

    const book = await getBookDetailsApi(id);

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
                    src={book.image_url || "/placeholder.png"}
                    alt={book.title}
                    height={320}
                    width={216}
                    className="w-54 h-80 rounded-md"
                />
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-secondary text-4xl font-bold">{book.title}</h2>
                        <span className="text-secondary text-2xl font-normal">{book.author}</span>
                        <div className="flex gap-10">
                            <p className="text-secondary font-medium">4.5</p>
                            <p className="text-muted font-light">89,234 ratings - 6,110 reviews</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <ShelfDialog book={book}/>
                        <Button variant="outline" className="text-secondary text-md w-fit py-6 px-5 border border-border-strong hover:bg-secondary/10">
                            <Star />
                            Rate
                        </Button>
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
        </section>
    )
}