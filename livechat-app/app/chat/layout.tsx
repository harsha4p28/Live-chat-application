"use client";

import Sidebar from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isChatOpen = pathname !== "/chat";

  return (
    <div className="h-screen flex bg-zinc-100">
      
      <div
        className={`
          ${isChatOpen ? "hidden" : "flex"} 
          md:flex w-full md:w-72 border-r bg-white
        `}
      >
        <Sidebar />
      </div>

      <div
        className={`
          ${isChatOpen ? "flex" : "hidden"} 
          md:flex flex-1 flex-col
        `}
      >
        {children}
      </div>
    </div>
  );
}