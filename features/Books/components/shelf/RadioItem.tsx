import { LucideIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroupItem } from "@/components/ui/radio-group"

interface RadioItemProps {
  icon: LucideIcon
  label: string
  value: string
  id: string
}

export default function RadioItem({ icon: Icon, label, value, id }: RadioItemProps) {
  return (
    <div className="group relative flex justify-between p-3 border border-border-strong rounded-lg has-data-checked:bg-primary/20 has-data-checked:border-primary/80 cursor-pointer!">
      <div className="flex gap-4">
        <Icon className="w-5 h-5 text-secondary group-has-data-checked:text-yellow-700"/>
        <Label htmlFor={id} className="text-secondary group-has-data-checked:text-yellow-700 cursor-pointer after:absolute after:inset-0 after:cursor-pointer">{label}</Label>
      </div>
      <RadioGroupItem value={value} id={id}/>
    </div>
  )
}
