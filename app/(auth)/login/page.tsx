import LoginForm from "@/features/Auth/Login/components/LoginForm";
import Link from "next/link";

export default function LoginPage(){
    return (
        <div className="w-full md:w-1/2 flex flex-col px-6 sm:px-12 md:px-20 gap-6 justify-center h-full">
            <div className="flex flex-col">
                <h2 className="text-secondary text-3xl font-medium">Welcome back!</h2>
                <p className="text-secondary-light text-md font-medium">Log in to pick up where you left off.</p>
            </div>
            <LoginForm />
            <div className="flex gap-0.5 text-sm w-full">
                <p className="text-secondary-light font-normal">Don&apos;t have an account?</p>
                <Link href="/sign-up" className="font-semibold text-secondary">Create an account</Link>
            </div>
        </div>
    )
}