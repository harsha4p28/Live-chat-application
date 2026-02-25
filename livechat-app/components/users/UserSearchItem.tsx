"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  userId: Id<"users">
  name: string
}

export default function UserSearchItem({ userId, name }: Props) {
  const router = useRouter()
  const getOrCreateConversation = useMutation(
    api.conversations.getOrCreateConversation
  )

  const handleClick = async () => {
    const conversationId = await getOrCreateConversation({
      otherUserId: userId,
    })

    router.push(`/chat/${conversationId}`)
  }

  return (
    <div
      onClick={handleClick}
      className="p-2 rounded-lg hover:bg-zinc-100 cursor-pointer"
    >
      {name}
    </div>
  )
}