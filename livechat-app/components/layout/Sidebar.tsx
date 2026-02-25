"use client"

import { useState } from "react"
import ConversationItem from "@/components/conversations/ConversationItem"
import UserSearchItem from "@/components/users/UserSearchItem"
import { api } from "@/convex/_generated/api"
import { UserButton } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { ClipLoader } from "react-spinners"

export default function Sidebar() {
  const [search, setSearch] = useState("")

  const conversations = useQuery(
    api.conversations.getUserConversations
  )

  const users = useQuery(
    api.users.searchUsers,
    search.trim() ? { search } : "skip"
  )

  const isSearching = search.trim().length > 0

  return (
    <div className="flex flex-col h-full w-full bg-white border-r">
      
      <div className="flex justify-between items-center p-4 border-b">
        <div className="font-semibold text-lg">Live Chat</div>
        <UserButton />
      </div>

      <div className="p-4 border-b">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 p-4">
        {isSearching ? (
          users === undefined ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader size={30} />
            </div>
          ) : users.length === 0 ? (
            <div className="text-sm text-gray-500">
              No users found
            </div>
          ) : (
            users.map((user) => (
              <UserSearchItem
                key={user._id}
                userId={user._id}
                name={user.name}
              />
            ))
          )
        ) : conversations === undefined ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={30} />
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-sm text-gray-500">
            No conversations yet
          </div>
        ) : (
          conversations.map((conv) => (
            <ConversationItem
              key={conv.conversationId}
              conversationId={conv.conversationId}
              name={conv.name}
              lastMessage={conv.lastMessage}
            />
          ))
        )}
      </div>
    </div>
  )
}