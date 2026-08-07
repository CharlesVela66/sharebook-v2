import { Button } from "@/components/ui/button";
import { Shelf } from "@/db/schema";

interface FilterShelfButtonProps {
    label: Shelf;
    isSelected: boolean;
    onClick: () => void;
}

export default function FilterShelfButton({label, isSelected, onClick}: FilterShelfButtonProps) {
    return (
        <Button onClick={onClick} className={`rounded-xl ${isSelected ? "bg-secondary text-white font-medium hover:bg-secondary/90" : "bg-background text-secondary font-light border-border-strong hover:bg-secondary/10"}`}>
            {label}
        </Button>
    )
}