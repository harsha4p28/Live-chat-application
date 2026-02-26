"use client"

import { useState } from "react"
import ConversationItem from "@/components/conversations/ConversationItem"
import UserSearchItem from "@/components/users/UserSearchItem"
import { api } from "@/convex/_generated/api"
import { UserButton } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { ClipLoader } from "react-spinners"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function Sidebar() {
  const [search, setSearch] = useState("")

  const conversations = useQuery(api.conversations.getUserConversations)

  const users = useQuery(
    api.users.searchUsers,
    search.trim() ? { search } : "skip",
  )

  const isSearching = search.trim().length > 0

  return (
    <div className="flex flex-col h-full w-full bg-zinc-50 border-r">
      
      <div className="flex justify-between items-center px-5 py-4 bg-white backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-lg tracking-tight">
            Live Chat
          </h1>
        </div>

        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "h-9 w-9 ring-2 ring-zinc-200",
            },
          }}
        />
      </div>

      <Separator />

      <div className="p-4 bg-white">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full px-4 py-2 bg-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
        />
      </div>

      <Separator />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {isSearching ? (
          users === undefined ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader size={28} />
            </div>
          ) : users.length === 0 ? (
            <Card className="p-6 text-center text-sm text-muted-foreground">
              No users found
            </Card>
          ) : (
            users.map((user) => (
              <UserSearchItem
                key={user._id}
                userId={user._id}
                name={user.name}
                image={user.image}
              />
            ))
          )
        ) : conversations === undefined ? (
          <div className="flex justify-center items-center h-full">
            <ClipLoader size={28} />
          </div>
        ) : conversations.length === 0 ? (
          <Card className="p-6 text-center text-sm text-muted-foreground">
            No conversations yet
          </Card>
        ) : (
          conversations.map((conv) => (
            <ConversationItem
              key={conv.conversationId}
              conversationId={conv.conversationId}
              name={conv.name}
              lastMessage={conv.lastMessage}
              profileImage={conv.profileImage}
            />
          ))
        )}
      </div>
    </div>
  )
}