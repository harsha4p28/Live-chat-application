"use client"

import { useRouter } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  name: string
  lastMessage: string
  conversationId: Id<"conversations">
  className?: string
}

export default function ConversationItem({
  name,
  lastMessage,
  conversationId,
  className = "",
}: Props) {
  const router = useRouter()

  return (
    <div
      className={`flex flex-col p-3 gap-1 rounded-xl hover:bg-gray-100 cursor-pointer transition-all border border-transparent hover:border-gray-200 shadow-sm ${className}`}
      onClick={() => router.push(`/chat/${conversationId}`)}
    >
      <div className="font-semibold text-gray-800">{name}</div>
      <div className="text-sm text-gray-500 truncate">{lastMessage}</div>
    </div>
  )
}