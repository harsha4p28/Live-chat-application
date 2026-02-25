"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  conversationId: Id<"conversations">
}

export default function ConversationHeader({
  conversationId,
}: Props) {
  const recipient = useQuery(
    api.conversations.getConversationDetails,
    { conversationId }
  )

  if (!recipient) return null

  return (
    <div className="p-3.5 border-b bg-white flex items-center gap-3">
      <img
        src={recipient.image}
        className="w-8 h-8 rounded-full"
      />
      <div className="font-semibold text-lg">
        {recipient.name}
      </div>
    </div>
  )
}