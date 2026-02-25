import Sidebar from "@/components/layout/Sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex bg-zinc-100">
      <div className="hidden md:flex w-72 border-r bg-white">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}