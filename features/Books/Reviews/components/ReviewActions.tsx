import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon } from "lucide-react";

export default function ReviewActions() {
    return (
        <div className="flex gap-1">
            <Button type="button" variant="ghost" size="icon-sm" className="hover:bg-transparent dark:hover:bg-transparent">
                <PencilIcon />
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" className="hover:bg-transparent dark:hover:bg-transparent">
                <Trash2Icon />
            </Button>
        </div>
    )
}