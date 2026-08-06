import { Button } from "@/components/ui/button";
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getUserById } from "@/features/Users/services/user.services";

export default async function UserPage({
    params
}: {params: Promise<{id: string}>}){
    const { id } = await params;

    const user = await getUserById(id);

    if (!user){
        return <div>User not found</div>
    }
    const data = [
        {
            label: "books read",
            value: 128
        },
        {
            label: "friends",
            value: 340
        },
        {
            label: "reviews",
            value: 58
        },
    ]

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="flex flex-row items-center gap-4">
                    <div className="flex items-center justify-center bg-primary h-18 w-18 rounded-full text-3xl font-medium text-secondary">{user.first_name.charAt(0).toUpperCase()}</div>
                    <div className="flex flex-col">
                        <p className="text-xl text-secondary font-semibold">{user.first_name} {user.last_name}</p>
                        <p className="text-xs text-muted">Sci-fi and literary fiction · Joined {user.created_at?.getFullYear()}</p>
                    </div>
                </div>
                <Button variant="outline">Edit profile</Button>
            </div>
            <Separator />
            <div className="flex gap-6">
                {data.map((d, index) => (
                    <div key={index} className="flex flex-col space-y-0">
                        <p className="text-xl text-secondary font-semibold">{d.value}</p>
                        <p className="text-sm text-muted font-medium">{d.label}</p>
                    </div>
                ))}
            </div>
            <Separator />
            <div className="flex flex-col bg-secondary w-full py-4 px-6 rounded-xl">
                <Progress value={37} className="w-full text-background">
                    <ProgressLabel>2026 reading goal</ProgressLabel>
                    <ProgressValue className="text-primary"/>
                </Progress>
            </div>
        </section>
    )
}