"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  conversationId: Id<"conversations">
}

export default function TypingIndicator({ conversationId }: Props) {
  const typingUsers = useQuery(api.typing.getTypingUsers, { conversationId })

  if (!typingUsers || typingUsers.length === 0) return null

  const label =
    typingUsers.length === 1
      ? `${typingUsers[0]} is typing`
      : `${typingUsers.join(", ")} are typing`

  return (
    <div className="px-4 pb-1 flex items-center gap-2 text-sm text-gray-500">
      <span>{label}</span>
      <span className="flex gap-0.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    </div>
  )
}