"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ShelfButton from "./ShelfButton"
import { Book, Shelf } from "@/db/schema"
import Image from "next/image"
import { RadioGroup } from "@/components/ui/radio-group"
import RadioItem from "./RadioItem"
import { BookmarkIcon, BookOpenIcon, CheckIcon } from "lucide-react"
import { toast } from "sonner"
import { updateBookShelf } from "../../services/book.services"
import { useState } from "react"

interface ShelfDialogProps {
  book: Book
  shelf: Shelf | null
}

export default function ShelfDialog({ book, shelf }: ShelfDialogProps) {

  const [shelfValue, setShelfValue] = useState<Shelf | null>(shelf);
  const [open, setOpen] = useState<boolean>(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const shelf = formData.get("shelf-radio-group") as Shelf;
    try {
      const result = await updateBookShelf({
        shelf: shelf,
        bookId: book.id
      });
      if (!result.success){
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't save your book shelf. Try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<ShelfButton shelf={shelf}/>} />
      <DialogContent className="sm:max-w-sm bg-background">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-secondary text-xl font-normal mb-3">Add to shelf</DialogTitle>
            <div className="flex gap-3">
              <Image
                src={book.image_url || "/placeholder.png"}
                alt={book.title}
                height={64}
                width={36}
                className="rounded-sm"
              />
              <div className="flex flex-col justify-center">
                <p className="text-sm font-medium text-secondary">{book.title}</p>
                <p className="text-xs text-muted font-light">{book.author}</p>
              </div>
            </div>
          </DialogHeader>
          <RadioGroup className="w-full" name="shelf-radio-group" value={shelfValue} onValueChange={setShelfValue}>
            <RadioItem icon={BookmarkIcon} label="Want to read" value="Want to read" id="r1"/>
            <RadioItem icon={BookOpenIcon} label="Currently reading" value="Currently reading" id="r2"/>
            <RadioItem icon={CheckIcon} label="Read" value="Read" id="r3"/>
          </RadioGroup>
          <DialogFooter className="bg-background">
            <DialogClose render={<Button variant="outline" className="hover:bg-secondary-light/20 p-3">Cancel</Button>} />
            <Button type="submit" className="bg-primary hover:bg-primary/90 p-3">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
