"use client"

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function LoginButton() {
    const router = useRouter();
    return (
        <Button size="sm" className="sm:h-9 sm:px-4 sm:py-2 sm:text-sm" onClick={() => router.push('/login')}>Login</Button>
    )
}