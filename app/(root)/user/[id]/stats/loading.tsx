import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <section className="flex flex-col space-y-4">
            <Skeleton className="h-9 w-40" />
            <div className="w-full flex gap-4 bg-secondary p-5 rounded-xl">
                <Skeleton className="size-11 rounded-lg shrink-0" />
                <div className="flex flex-col gap-2 justify-center">
                    <Skeleton className="h-6 w-10" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
            <div className="w-75">
                <Skeleton className="h-9 w-full" />
            </div>
            <Skeleton className="h-72 w-full rounded-lg" />
        </section>
    );
}
