"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Shelf } from "@/db/schema"
import { BookCard } from "../../types/book.types"
import { resolveBookForShelf } from "../services/book.shelves.services"
import ShelfButton from "./ShelfButton"
import ShelfDialog from "./ShelfDialog"
import { ResolvedShelfBook } from "../types/book.shelves.types"

interface ShelfDialogTriggerProps {
  book: BookCard
  shelf: Shelf | null
}

export default function ShelfDialogTrigger({ book, shelf }: ShelfDialogTriggerProps) {

  const [resolved, setResolved] = useState<ResolvedShelfBook | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  async function handleTriggerClick(e: React.MouseEvent){
    if (resolved) return; // already cached locally, let ShelfDialog's own trigger take over
    e.preventDefault();

    setIsPending(true);
    try {
      const result = await resolveBookForShelf(book.work_id);
      setResolved(result);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't load this book. Try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {resolved ? (
        <ShelfDialog book={resolved.book} shelf={resolved.shelf} defaultOpen />
      ) : (
        <ShelfButton
          shelf={shelf}
          disabled={isPending}
          onClick={handleTriggerClick}
        />
      )}
    </div>
  );
}
