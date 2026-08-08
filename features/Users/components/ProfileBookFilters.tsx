"use client"

import { Shelf } from "@/db/schema";
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
                <FilterShelfButton label="Read" isSelected={selectedShelf === "Read"} onClick={() => setSelectedShelf("Read")}/>
                <FilterShelfButton label="Currently reading" isSelected={selectedShelf === "Currently reading"} onClick={() => setSelectedShelf("Currently reading")}/>
                <FilterShelfButton label="Want to read" isSelected={selectedShelf === "Want to read"} onClick={() => setSelectedShelf("Want to read")}/>
            </div>
            <div className="flex gap-3">
                {filteredBookShelves.length === 0 ? (
                    <p className="text-sm text-muted">No books in this shelf yet.</p>
                ) : (
                    filteredBookShelves.map((bookShelf) => (
                        <Link key={bookShelf.shelfId} href={`/book/${bookShelf.book.open_library_work_id}`}>
                            <Image
                                src={bookShelf.book.image_url || "/placeholder.png"}
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