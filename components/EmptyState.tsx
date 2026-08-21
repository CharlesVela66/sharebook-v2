import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    action?: React.ReactNode;
    className?: string;
}

export default function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-1 text-center py-12 px-6", className)}>
            <div className="flex items-center justify-center size-12 rounded-full bg-primary-tint text-primary-hover mb-2">
                <Icon className="size-6" />
            </div>
            <p className="text-secondary font-semibold text-base">{title}</p>
            <p className="text-muted text-sm font-normal max-w-sm">{description}</p>
            {action && <div className="mt-3">{action}</div>}
        </div>
    );
}
