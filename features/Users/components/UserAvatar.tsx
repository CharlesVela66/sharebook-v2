import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn, getAvatarColor } from "@/lib/utils";
import { User } from "@/db/schema";

interface UserAvatarProps {
    user: Pick<User, "first_name" | "last_name" | "profile_picture">;
    size?: "default" | "sm" | "lg";
    className?: string;
};
export default function UserAvatar({ user, size = "default", className }: UserAvatarProps) {
    const color = getAvatarColor(`${user.first_name} ${user.last_name}`);

    return (
        <Avatar size={size} className={className}>
            {user.profile_picture && (
                <AvatarImage src={user.profile_picture} alt={`${user.first_name}'s profile picture`} />
            )}
            <AvatarFallback className={cn("font-medium text-white", color)}>
                {user.first_name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    );
}
