import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="flex flex-col gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-full flex gap-3 py-4 px-6 bg-card rounded-lg border border-border-strong">
                    <Skeleton className="size-10 rounded-full shrink-0" />
                    <div className="flex-1 flex flex-col gap-3">
                        <Skeleton className="h-4 w-3/4" />
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-15 w-10 rounded shrink-0" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-3 w-20" />
                    </div>
                </div>
            ))}
        </section>
    );
}
