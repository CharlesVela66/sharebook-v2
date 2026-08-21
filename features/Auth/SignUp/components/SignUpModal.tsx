import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import Link from "next/link";

interface SignUpModalProps {
    open: boolean;
    onOpen: (open: boolean) => void;
    type: "shelf" | "rating" | "review" | "like" | "friends";
}
export default function SignUpModal({open, onOpen, type} : SignUpModalProps){
    return (
        <AlertDialog open={open} onOpenChange={onOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Access Denied</AlertDialogTitle>
                <AlertDialogDescription>
                    You must login to {type === "shelf"
                    ? "save books in shelves"
                    : type === "rating"
                    ? "rate a book"
                    : type === "review"
                    ? "review a book"
                    : type === "like"
                    ? "like a review"
                    : "view your friends"
                    }
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="bg-card">
                    <AlertDialogCancel className="hover:bg-secondary/10">Close</AlertDialogCancel>
                    <AlertDialogAction>
                        <Link href="/login">
                            Login
                        </Link>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}