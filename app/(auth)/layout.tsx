import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <section className="flex w-full h-screen bg-background">
            <div className="md:flex hidden bg-primary justify-center items-center w-1/2 h-full">
                <Image 
                    src="/logo/full-logo-black.png"
                    alt="ShareBook logo"
                    width={500}
                    height={500}
                />
            </div>
            {children}
        </section>
    )
}