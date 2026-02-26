"use client"

import { useRouter } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  name: string
  lastMessage: string
  conversationId: Id<"conversations">
  className?: string
  profileImage: string | null
}

export default function ConversationItem({
  name,
  lastMessage,
  conversationId,
  className = "",
  profileImage,
}: Props) {
  const router = useRouter()

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition-all border border-transparent hover:border-gray-200 hover:shadow-md ${className}`}
      onClick={() => router.push(`/chat/${conversationId}`)}
    >
      <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-2 ring-white shadow-sm">
        {profileImage ? (
          <img
            src={profileImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-gray-600">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-800 truncate">
          {name}
        </div>
        <div className="text-sm text-gray-500 truncate">
          {lastMessage}
        </div>
      </div>
    </div>
  )
}