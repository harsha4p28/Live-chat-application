"use client"

import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  userId: Id<"users">
  name: string
  className?: string
  image: string
}

export default function UserSearchItem({ userId, name, className = "" ,image}: Props) {
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
      className={`flex items-center p-3 gap-3 rounded-xl hover:bg-gray-100 cursor-pointer transition-all border border-transparent hover:border-gray-200 shadow-sm ${className}`}
    >
      <div className="h-10 w-10 bg-gray-300 rounded-full flex-shrink-0" >
        <img src={image} className="h-full w-full rounded-full object-cover" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-800">{name}</div>
      </div>
    </div>
  )
}