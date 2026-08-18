import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserBookShelves } from "@/features/Books/Shelves/services/book.shelves.services";
import ProfileGenreBreakdownChart from "@/features/Users/components/profile/ProfileGenreBreakdownChart";
import ProfileShelfDistributionChart from "@/features/Users/components/profile/ProfileShelfDistributionChart";
import ProfileYearChart from "@/features/Users/components/profile/ProfileYearChart";
import { getUserById } from "@/features/Users/services/user.services";
import { getProfileStats } from "@/features/Users/utils/user.utils";
import { BookOpen } from "lucide-react";

export default async function UserStatsPage({
    params
}: {params: Promise<{id: string}>}){
    const { id } = await params;

    const [user, shelves] = await Promise.all([
        getUserById(id),
        getUserBookShelves(id),
    ]);

    if (!user){
        return <div>User not found</div>
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
                        <p className="text-center text-muted text-sm font-normal">You haven&apos;t read any books yet, so there&apos;s no genre breakdown to show.</p>
                    )}
                </TabsContent>
                <TabsContent value="year">
                    {profileStats.booksReadByYear && Object.keys(profileStats.booksReadByYear).length > 0 ? (
                        <ProfileYearChart booksReadByYear={profileStats.booksReadByYear}/>
                    ) : (
                        <p className="text-center text-muted text-sm font-normal">You haven&apos;t read any books yet, so there&apos;s no yearly history to show.</p>
                    )}
                </TabsContent>
                <TabsContent value="shelf">
                    {profileStats.shelfDistribution && profileStats.shelfDistribution.length > 0 ? (
                        <ProfileShelfDistributionChart shelfDistribution={profileStats.shelfDistribution} />
                    ) : (
                        <p className="text-center text-muted text-sm font-normal">You don&apos;t have any books on your shelves yet.</p>
                    )}
                </TabsContent>
            </Tabs>
        </section>
    )
}