import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function Loading() {
    return (
        <section className="space-y-4">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-4">
                    <Skeleton className="size-18 rounded-full shrink-0" />
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-3 w-56" />
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <Skeleton className="h-10 w-32" />
                    <Skeleton className="h-10 w-40" />
                </div>
            </div>
            <Separator />
            <div className="flex gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        <Skeleton className="h-6 w-10" />
                        <Skeleton className="h-3 w-14" />
                    </div>
                ))}
            </div>
            <Separator />
            <Skeleton className="h-16 w-full rounded-xl" />
            <div className="flex flex-col space-y-4">
                <div className="flex gap-3">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-36" />
                    <Skeleton className="h-9 w-32" />
                </div>
                <div className="flex gap-3">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-23 w-16 rounded-md" />
                    ))}
                </div>
            </div>
        </section>
    );
}
