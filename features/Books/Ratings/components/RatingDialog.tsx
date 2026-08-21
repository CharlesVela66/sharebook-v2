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
import { Book } from "@/db/schema"
import Image from "next/image"
import { useState } from "react"
import RatingButton from "./RatingButton"
import RatingStar from "./RatingStar"
import { toast } from "sonner"
import { updateBookRating } from "../services/book.ratings.services"
import SignUpModal from "@/features/Auth/SignUp/components/SignUpModal"

interface RatingDialogProps {
  book: Book;
  bookRating: number | null
}

export default function RatingDialog({ book, bookRating }: RatingDialogProps) {

  const [open, setOpen] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(bookRating ?? 0);
  const [signUpOpen, setSignUpOpen] = useState<boolean>(false);

  function handleRating(data: number) {
    setRating(data);
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault();

    try {
      if (rating > 0){
        const result = await updateBookRating({
          bookId: book.id,
          rating,
        });
        if (result.unauthenticated){
          setOpen(false);
          setSignUpOpen(true);
          return;
        }
        if (!result.success){
          toast.error(result.message);
          return;
        }
        toast.success(result.message);
        setOpen(false);
      } else {
        toast.warning("You haven't selected a rating.")
        return;
      }
    } catch (error){
      console.error(error);
      toast.error("Error updating book rating. Try again.")
    }
  }

  return (
    <>
      <SignUpModal open={signUpOpen} onOpen={setSignUpOpen} type="rating"/>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<RatingButton />} />
        <DialogContent className="sm:max-w-sm bg-background">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-secondary text-xl font-normal mb-3">Rate this book</DialogTitle>
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
            <RatingStar rating={rating} onRatingChange={handleRating}/>
            <DialogFooter className="bg-background">
              <DialogClose render={<Button variant="outline" className="hover:bg-secondary-light/20 p-3">Cancel</Button>} />
              <Button type="submit" className="bg-primary hover:bg-primary/90 p-3">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
