import Image from "next/image";
import Link from "next/link";
import UserAvatar from "@/features/Users/components/UserAvatar";
import { getBookDetailUrl } from "@/features/Books/utils/book.utils";
import { FeedEvent } from "../types/feed.types";
import { formatFeedMessage, formatFeedRelativeTime } from "../utils/feed.utils";

export default function FeedCard({ event }: { event: FeedEvent }) {
    return (
        <div className="w-full flex gap-3 py-4 px-6 bg-card rounded-lg border border-border-strong">
            <UserAvatar user={event.actor} />
            <div className="flex-1 flex flex-col gap-2">
                <p className="text-secondary font-normal">
                    <span className="font-bold">{event.actor.first_name} {event.actor.last_name}</span>{" "}
                    {formatFeedMessage(event)}
                </p>
                <Link href={getBookDetailUrl(event.book.workId)} className="flex items-center gap-3 w-fit">
                    {event.book.imageUrl && (
                        <Image
                            src={event.book.imageUrl}
                            alt={event.book.title}
                            width={40}
                            height={60}
                            className="h-15 w-10 object-cover rounded"
                        />
                    )}
                    <span className="text-secondary font-medium">{event.book.title}</span>
                </Link>
                <span className="text-muted text-sm font-normal">{formatFeedRelativeTime(event.createdAt)}</span>
            </div>
        </div>
    );
}
