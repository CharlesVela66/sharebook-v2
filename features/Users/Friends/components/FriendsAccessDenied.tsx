"use client"

import { useRouter } from "next/navigation";
import SignUpModal from "@/features/Auth/SignUp/components/SignUpModal";

export default function FriendsAccessDenied() {
    const router = useRouter();

    return (
        <SignUpModal
            open
            onOpen={(open) => {
                if (!open) router.push("/");
            }}
            type="friends"
        />
    );
}
