import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-full flex flex-col space-y-3 sm:flex-row py-4 px-6 justify-between bg-card rounded-lg border border-border-strong">
                    <div className="flex gap-10">
                        <Skeleton className="h-32 w-20 shrink-0" />
                        <div className="flex flex-col justify-between gap-2">
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-5 w-48" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-3 w-40" />
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-fit">
                        <Skeleton className="h-9 w-28" />
                    </div>
                </div>
            ))}
        </section>
    );
}
