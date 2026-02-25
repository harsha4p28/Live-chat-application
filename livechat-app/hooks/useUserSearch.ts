"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"

export function useUserSearch(search: string) {
  const { user } = useUser()

  return useQuery(api.users.searchUsers, {
    search,
    clerkId: user?.id ?? "",
  })
}