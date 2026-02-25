"use client"

import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  name: string
  lastMessage: string
  id: Id<"users">
}

export default function ConversationItem({
  name,
  lastMessage,
  id,
}: Props) {
  const router = useRouter()

  const getOrCreateConversation = useMutation(
    api.conversations.getOrCreateConversation
  )

  const currentUser = useQuery(api.users.getCurrentUser)

  const handleClick = async () => {
    if (!currentUser) return

    const conversationId = await getOrCreateConversation({
      currentUserId: currentUser._id,
      otherUserId: id,
    })

    router.push(`/chat/${conversationId}`)
  }

  return (
    <div
      className="p-3 rounded-xl hover:bg-zinc-100 cursor-pointer transition"
      onClick={handleClick}
    >
      <div className="font-medium">{name}</div>
      <div className="text-sm text-zinc-500 truncate">
        {lastMessage}
      </div>
    </div>
  )
}