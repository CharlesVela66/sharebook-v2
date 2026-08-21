import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserBookShelves } from "@/features/Books/Shelves/services/book.shelves.services";
import ProfileGenreBreakdownChart from "@/features/Users/components/profile/ProfileGenreBreakdownChart";
import ProfileShelfDistributionChart from "@/features/Users/components/profile/ProfileShelfDistributionChart";
import ProfileYearChart from "@/features/Users/components/profile/ProfileYearChart";
import { getUserById } from "@/features/Users/services/user.services";
import { getProfileStats } from "@/features/Users/utils/user.utils";
import { BookOpen, PieChart, CalendarDays, Library, UserX } from "lucide-react";
import EmptyState from "@/components/EmptyState";

export default async function UserStatsPage({
    params
}: {params: Promise<{id: string}>}){
    const { id } = await params;

    const [user, shelves] = await Promise.all([
        getUserById(id),
        getUserBookShelves(id),
    ]);

    if (!user){
        return (
            <EmptyState
                icon={UserX}
                title="User not found"
                description="This user doesn't exist or may have been removed."
            />
        );
    }

    const profileStats = getProfileStats(shelves);
    
    return (
        <section className="flex flex-col space-y-4">
            <h1 className="text-secondary font-semibold text-3xl">Your stats</h1>  
            <div className="w-full flex gap-4 bg-secondary p-5 rounded-xl">
                <div className="bg-primary/50 p-2 rounded-lg h-fit">
                    <BookOpen className="w-7 h-7 text-primary"/>    
                </div>   
                <div className="flex flex-col">
                    <h6 className="text-2xl font-medium text-white -mb-1">{profileStats.totalBooksRead}</h6>
                    <p className="text-gray-300 text-sm">total books read</p>
                </div> 
            </div>  
            <Tabs defaultValue="genre" className="w-full space-y-4">
                <div className="w-75">
                    <TabsList variant="line" className="w-full">
                        <TabsTrigger value="genre">By genre</TabsTrigger>
                        <TabsTrigger value="year" className="gap-1.5">By year</TabsTrigger>
                        <TabsTrigger value="shelf" className="gap-1.5">Shelf distribution</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="genre" className="w-full">
                    {profileStats.genreBreakdown && profileStats.genreBreakdown.length > 0 ? (
                        <ProfileGenreBreakdownChart genreBreakdown={profileStats.genreBreakdown}/>
                    ) : (
                        <EmptyState
                            icon={PieChart}
                            title="No genre data yet"
                            description="You haven't read any books yet, so there's no genre breakdown to show."
                        />
                    )}
                </TabsContent>
                <TabsContent value="year">
                    {profileStats.booksReadByYear && Object.keys(profileStats.booksReadByYear).length > 0 ? (
                        <ProfileYearChart booksReadByYear={profileStats.booksReadByYear}/>
                    ) : (
                        <EmptyState
                            icon={CalendarDays}
                            title="No yearly history yet"
                            description="You haven't read any books yet, so there's no yearly history to show."
                        />
                    )}
                </TabsContent>
                <TabsContent value="shelf">
                    {profileStats.shelfDistribution && profileStats.shelfDistribution.length > 0 ? (
                        <ProfileShelfDistributionChart shelfDistribution={profileStats.shelfDistribution} />
                    ) : (
                        <EmptyState
                            icon={Library}
                            title="No shelves yet"
                            description="You don't have any books on your shelves yet."
                        />
                    )}
                </TabsContent>
            </Tabs>
        </section>
    )
}