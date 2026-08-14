import SignUpForm from "@/features/Auth/SignUp/components/SignUpForm";
import Link from "next/link";

export default function SignUpPage(){
    return (
        <div className="w-full md:w-1/2 flex flex-col px-6 sm:px-12 md:px-20 gap-6 justify-center h-full">
            <div className="flex flex-col">
                <h2 className="text-secondary text-3xl font-medium">Create your account</h2>
                <p className="text-secondary-light text-md font-medium">Free, and takes less than a minute.</p>
            </div>
            <SignUpForm />
            <div className="flex gap-0.5 text-sm w-full">
                <p className="text-secondary-light font-normal">Already have an account?</p>
                <Link href="/login" className="font-semibold text-secondary">Login</Link>
            </div>
        </div>
    )
}