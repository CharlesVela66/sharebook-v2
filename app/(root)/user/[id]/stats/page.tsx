import { getUserById } from "@/features/Users/services/user.services";

export default async function UserStatsPage({
    params
}: {params: Promise<{id: string}>}){
    const { id } = await params;

    const [user] = await Promise.all([
        getUserById(id),
    ]);

    if (!user){
        return <div>User not found</div>
    }
    
    return (
        <div>
            {user.first_name}
        </div>
    )
}