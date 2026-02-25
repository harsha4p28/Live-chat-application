"use client"

import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

import { ClipLoader } from "react-spinners"
import UserSearchItem from "./UserSearchItem"

export default function UserSearch() {
  const [search, setSearch] = useState("")

  const users = useQuery(
    api.users.searchUsers,
    search.trim() ? { search } : "skip"
  )

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {search.trim() && (
        <div className="absolute w-full bg-white border rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto z-50">
          {users ? (
            users.length > 0 ? (
              users.map((user) => (
                <UserSearchItem
                  key={user._id}
                  userId={user._id}
                  name={user.name}
                />
              ))
            ) : (
              <div className="p-2 text-sm text-gray-500">
                No users found
              </div>
            )
          ) : (
            <div className="flex justify-center p-3">
              <ClipLoader size={20} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}