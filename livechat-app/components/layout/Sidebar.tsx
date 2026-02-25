"use client";

import { useState } from "react";
import ConversationItem from "@/components/conversations/ConversationItem";
import UserSearchItem from "@/components/users/UserSearchItem";
import { api } from "@/convex/_generated/api";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { ClipLoader } from "react-spinners";

export default function Sidebar() {
  const [search, setSearch] = useState("");

  const conversations = useQuery(api.conversations.getUserConversations);

  const users = useQuery(
    api.users.searchUsers,
    search.trim() ? { search } : "skip",
  );

  const isSearching = search.trim().length > 0;

  return (
    <div className="flex flex-col h-full w-full bg-white border-r border-gray-200 shadow-sm">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <div className="font-semibold text-lg text-gray-800">Live Chat</div>
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "h-9 w-9",
            },
          }}
        />
      </div>

      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {isSearching ? (
          users === undefined ? (
            <div className="flex justify-center items-center h-full">
              <ClipLoader size={30} color="#3B82F6" />
            </div>
          ) : users.length === 0 ? (
            <div className="text-sm text-gray-500 text-center">
              No users found
            </div>
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
            <ClipLoader size={30} color="#3B82F6" />
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-sm text-gray-500 text-center">
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
  );
}
