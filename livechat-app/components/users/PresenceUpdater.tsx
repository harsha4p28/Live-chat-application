"use client"

import { useEffect } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

export default function PresenceUpdater() {
  const updatePresence = useMutation(api.users.updatePresence)

  useEffect(() => {
    updatePresence()

    const interval = setInterval(() => {
      updatePresence()
    }, 5000)

    return () => clearInterval(interval)
  }, [updatePresence])

  return null
}