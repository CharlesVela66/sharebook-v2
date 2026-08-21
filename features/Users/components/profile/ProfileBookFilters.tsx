"use client"

import { BookOpen } from "lucide-react";
import { Shelf } from "@/db/schema";
import EmptyState from "@/components/EmptyState";
import FilterShelfButton from "@/features/Books/Shelves/components/FilterShelfButton";
import { ShelfBook } from "@/features/Books/Shelves/types/book.shelves.types"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react"

interface ProfileBookFiltersProps {
    bookShelves: ShelfBook[]
}

export default function ProfileBookShelfFilters({ bookShelves } : ProfileBookFiltersProps){
    const [selectedShelf, setSelectedShelf] = useState<Shelf>("Read");
    const filteredBookShelves = bookShelves.filter((b) => b.shelf === selectedShelf);

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex gap-3">
                <FilterShelfButton 
                    label="Read" 
                    isSelected={selectedShelf === "Read"} 
                    onClick={() => setSelectedShelf("Read")}
                    count={bookShelves.filter((b) => b.shelf === "Read").length}
                />
                <FilterShelfButton 
                    label="Currently reading" 
                    isSelected={selectedShelf === "Currently reading"} 
                    onClick={() => setSelectedShelf("Currently reading")}
                    count={bookShelves.filter((b) => b.shelf === "Currently reading").length}
                />
                <FilterShelfButton 
                    label="Want to read" 
                    isSelected={selectedShelf === "Want to read"} 
                    onClick={() => setSelectedShelf("Want to read")}
                    count={bookShelves.filter((b) => b.shelf === "Want to read").length}
                />
            </div>
            <div className="flex gap-3 w-full">
                {filteredBookShelves.length === 0 ? (
                    <EmptyState
                        icon={BookOpen}
                        title="No books here yet"
                        description={`You haven't added any books to "${selectedShelf}" yet.`}
                        className="w-full py-8"
                    />
                ) : (
                    filteredBookShelves.map((bookShelf) => (
                        <Link key={bookShelf.shelfId} href={`/book/${bookShelf.book.open_library_work_id}`}>
                            <Image
                                src={bookShelf.book.image_url || "/book-placeholder.svg"}
                                alt={bookShelf.book.title}
                                width={64}
                                height={92}
                                className="rounded-md"
                            />
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}