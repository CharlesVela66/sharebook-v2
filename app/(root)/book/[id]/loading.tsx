import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="w-full flex flex-col gap-9">
            <div className="flex gap-6">
                <Skeleton className="w-32 h-48 sm:w-54 sm:h-80 rounded-md shrink-0" />
                <div className="flex flex-col gap-6 w-full">
                    <div className="flex flex-col gap-3">
                        <Skeleton className="h-9 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <div className="flex gap-10">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-32" />
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
            </div>
            <div className="flex gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-18 w-full max-w-1/3 rounded-lg" />
                ))}
            </div>
            <div className="flex flex-col gap-3">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex flex-col gap-3">
                <Skeleton className="h-7 w-28" />
                {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-lg" />
                ))}
            </div>
        </section>
    );
}
