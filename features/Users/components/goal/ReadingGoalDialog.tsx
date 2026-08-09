"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useState } from "react"
import ReadingGoalButton from "./ReadingGoalButton"
import { Input } from "@/components/ui/input"
import { updateReadingGoal } from "../../services/user.services"

interface ReadingGoalDialogProps {
    goal?: number
}

export default function ReadingGoalDialog({ goal = 12 }: ReadingGoalDialogProps) {
  const [currentGoal, setCurrentGoal] = useState<number | "">(goal);
  const [open, setOpen] = useState<boolean>(false);

  function handleSubtract() {
    setCurrentGoal((g) => {
      const num = g === "" ? 0 : g;
      return num > 1 ? num - 1 : g;
    })
  }

  function handleAdd() {
    setCurrentGoal((g) => {
      const num = g === "" ? 0 : g;
      return num < 999 ? num + 1 : g;
    })
  }

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>){
    e.preventDefault();
    if (currentGoal === "" || currentGoal < 1 || currentGoal > 999) {
      toast.error("Enter a reading goal between 1 and 999.")
      return;
    }
    try {
      const result = await updateReadingGoal(currentGoal);
      if (!result.success){
        toast.error(result.message);
        return;
      }
      toast.success(result.message);
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Couldn't save your reading goal. Try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<ReadingGoalButton />} />
      <DialogContent className="sm:max-w-sm bg-background">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="mb-3">
            <DialogTitle className="text-secondary text-xl font-normal">Add to shelf</DialogTitle>
            <DialogDescription>
              Set a goal for the amount of books you want to read in {new Date().getFullYear()}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 justify-center items-center">
            <Button onClick={handleSubtract}>
              -
            </Button>
            <Input
              value={currentGoal}
              min={1}
              max={999}
              type="number"
              onChange={(e) => {
                const raw = e.currentTarget.value;
                if (raw === "") {
                  setCurrentGoal("");
                  return;
                }
                const num = Number(raw);
                if (Number.isNaN(num)) return;
                const clamped = Math.min(999, Math.max(1, num));
                e.currentTarget.value = String(clamped);
                setCurrentGoal(clamped);
              }}
              className="text-5xl! text-primary font-bold text-center tabular-nums border-none bg-transparent dark:bg-transparent shadow-none p-0 h-auto w-[3ch] focus-visible:ring-0 focus-visible:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
            <Button onClick={handleAdd}>
              +
            </Button>
          </div>
          <DialogFooter className="bg-background">
            <DialogClose render={<Button variant="outline" className="hover:bg-secondary-light/20 p-3">Cancel</Button>} />
            <Button type="submit" className="bg-primary hover:bg-primary/90 p-3">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
