"use client"

import ConversationItem from "@/components/conversations/ConversationItem"
import { api } from "@/convex/_generated/api"
import { UserButton } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { ClipLoader } from "react-spinners"

export default function Sidebar() {
  const conversations = useQuery(
    api.conversations.getUserConversations
  )

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <div className="font-semibold text-lg">Live Chat</div>
        <UserButton />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 px-4 pb-4">
        {conversations ? (
          conversations.map((conv) => (
            <ConversationItem
              key={conv.conversationId}
              conversationId={conv.conversationId}
              name={conv.name}
              lastMessage={conv.lastMessage}
            />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <ClipLoader color="#000" size={30} />
          </div>
        )}
      </div>
    </div>
  )
}