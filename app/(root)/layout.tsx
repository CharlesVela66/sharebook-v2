import Navbar from "@/components/Navbar";

export default function MainLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <nav>
      <Navbar />
      <div className="px-4 py-2 sm:px-16 sm:py-8">
        {children}
      </div>
    </nav>
  )
}