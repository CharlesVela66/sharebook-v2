import Navbar from "@/components/Navbar";

export default function MainLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <nav>
      <Navbar />
      <div className="px-8 py-8">
        {children}
      </div>
    </nav>
  )
}