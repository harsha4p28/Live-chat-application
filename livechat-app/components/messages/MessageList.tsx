"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import MessageItem from "./MessageItem"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  conversationId: Id<"conversations">
}

export default function MessageList({ conversationId }: Props) {
  const messages = useQuery(
    api.messages.getMessages,
    conversationId ? { conversationId } : "skip"
  )

  const currentUser = useQuery(api.users.getCurrentUser)

  if (!messages || !currentUser) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem
          key={message._id}
          text={message.text}
          isOwn={message.senderId === currentUser._id}
          time={new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        />
      ))}
    </div>
  )
}