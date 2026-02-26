"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import MessageItem from "./MessageItem"
import { Id } from "@/convex/_generated/dataModel"
import { useEffect, useRef } from "react"
import { ClipLoader } from "react-spinners"

type Props = {
  conversationId: Id<"conversations">
}

function formatMessageTime(timestamp: number) {
  const messageDate = new Date(timestamp)
  const now = new Date()

  const isToday =
    messageDate.toDateString() === now.toDateString()

  const isSameYear =
    messageDate.getFullYear() === now.getFullYear()

  if (isToday) {
    return messageDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    })
  }

  if (isSameYear) {
    return messageDate.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  }

  return messageDate.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
}

export default function MessageList({ conversationId }: Props) {
  const messages = useQuery(
    api.messages.getMessages,
    conversationId ? { conversationId } : "skip",
  )

  const currentUser = useQuery(api.users.getCurrentUser)

  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!messages) return
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  if (!messages || !currentUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader size={40} />
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <MessageItem
          key={message._id}
          messageId={message._id}
          text={message.text}
          isOwn={message.senderId === currentUser._id}
          time={formatMessageTime(message.createdAt)}
          reactions={message.reactions}
        />
      ))}

      <div ref={bottomRef} />
    </div>
  )
}