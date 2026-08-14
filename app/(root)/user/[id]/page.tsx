import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import ProfileBookShelfFilters from "@/features/Users/components/ProfileBookFilters";
import { getUserBookShelves } from "@/features/Books/Shelves/services/book.shelves.services";
import { getUserById, getUserReadingGoal } from "@/features/Users/services/user.services";
import EditProfileDialog from "@/features/Users/components/edit/EditProfileDialog";
import UserAvatar from "@/features/Users/components/UserAvatar";
import ReadingGoalDialog from "@/features/Users/components/goal/ReadingGoalDialog";
import { getProfileStats } from "@/features/Users/utils/user.utils";
import { getUserReviews } from "@/features/Books/Reviews/services/book.reviews.services";
import { auth } from "@/auth";

export default async function UserPage({
    params
}: {params: Promise<{id: string}>}){
    const { id } = await params;

    const [session, user, shelves, goal, reviews] = await Promise.all([
       auth(),
       getUserById(id),
       getUserBookShelves(id),
       getUserReadingGoal(id),
       getUserReviews(id),
    ])

    if (!user){
        return <div>User not found</div>
    }

    const isOwnProfile = session?.user?.id === id;

    const profileStats = getProfileStats(shelves);
    
    const data = [
        {
            label: "read",
            value: profileStats.totalBooksRead
        },
        {
            label: "friends",
            value: 340
        },
        {
            label: "reviews",
            value: reviews.length
        },
    ];
    return (
        <section className="space-y-4">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-4">
                    <UserAvatar user={user} className="size-18 text-3xl" />
                    <div className="flex flex-col">
                        <p className="text-xl text-secondary font-semibold">{user.first_name} {user.last_name}</p>
                        <p className="text-xs text-muted">Sci-fi and literary fiction · Joined {user.created_at?.getFullYear()}</p>
                    </div>
                </div>
                {isOwnProfile && (
                    <div className="flex flex-row gap-3 ">
                        <EditProfileDialog user={user}/>
                        <ReadingGoalDialog goal={goal ?? undefined}/>
                    </div>
                )}
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
                {goal ? (
                    <div className="flex flex-col bg-secondary w-full py-4 px-6 rounded-xl">
                        <Progress value={Math.min((profileStats.totalBooksRead / goal) * 100, 100)} className="w-full text-background">
                            <ProgressLabel>{new Date().getFullYear()} reading goal</ProgressLabel>
                            <ProgressValue className="text-primary"/>
                        </Progress>
                    </div>
                ) : (
                    <div className="text-sm text-muted text-center">You haven&apos;t set a reading goal</div>
                )}
            <ProfileBookShelfFilters bookShelves={shelves ?? []}/>
        </section>
    )
}