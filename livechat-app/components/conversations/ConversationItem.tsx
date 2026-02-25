"use client"

import { useRouter } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  name: string
  lastMessage: string
  conversationId: Id<"conversations">
}

export default function ConversationItem({
  name,
  lastMessage,
  conversationId,
}: Props) {
  const router = useRouter()

  return (
    <div
      className="p-3 m-1 gap-2 rounded-xl hover:bg-zinc-100 cursor-pointer transition border-1"
      onClick={() => router.push(`/chat/${conversationId}`)}
    >
      <div className="font-medium">{name}</div>
      <div className="text-sm text-zinc-500 truncate">
        {lastMessage}
      </div>
    </div>
  )
}