import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FeedPaginationProps = {
    page: number;
    hasMore: boolean;
};

export default function FeedPagination({ page, hasMore }: FeedPaginationProps) {
    const hasPrevious = page > 1;

    if (!hasPrevious && !hasMore) return null;

    return (
        <div className="flex justify-center items-center gap-3 pt-2">
            {hasPrevious ? (
                <Link href={`/?page=${page - 1}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                    Previous
                </Link>
            ) : (
                <span className={cn(buttonVariants({ variant: "outline", size: "sm" }), "opacity-50 pointer-events-none")}>
                    Previous
                </span>
            )}
            <span className="text-muted text-sm font-normal">Page {page}</span>
            {hasMore ? (
                <Link href={`/?page=${page + 1}`} className={buttonVariants({ variant: "outline", size: "sm" })}>
                    Next
                </Link>
            ) : (
                <span className={cn(buttonVariants({ variant: "outline", size: "sm" }), "opacity-50 pointer-events-none")}>
                    Next
                </span>
            )}
        </div>
    );
}
