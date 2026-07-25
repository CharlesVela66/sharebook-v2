import Navbar from "@/components/Navbar";

export default function MainLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <nav>
      <Navbar />
      {children}
    </nav>
  )
}