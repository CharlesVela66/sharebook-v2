import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="flex flex-col space-y-4">
            <div className="flex justify-between">
                <Skeleton className="h-8 w-40" />
                <div className="flex gap-3">
                    <Skeleton className="h-11 w-44" />
                    <Skeleton className="h-11 w-36" />
                </div>
            </div>
            <div className="w-75">
                <Skeleton className="h-9 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-card p-3 rounded-lg border border-border-strong flex flex-col items-center space-y-2">
                        <Skeleton className="size-14 rounded-full" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-3 w-16" />
                        <Skeleton className="h-9 w-full" />
                    </div>
                ))}
            </div>
        </section>
    );
}
