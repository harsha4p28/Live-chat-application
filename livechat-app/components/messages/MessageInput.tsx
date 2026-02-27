"use client"

import { useState, useRef } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  conversationId: Id<"conversations">
}

export default function MessageInput({ conversationId }: Props) {
  const [text, setText] = useState("")
  const sendMessage = useMutation(api.messages.sendMessage)
  const setTyping = useMutation(api.typing.setTyping)
  const clearTyping = useMutation(api.typing.clearTyping)

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)

    setTyping({ conversationId })

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    typingTimeoutRef.current = setTimeout(() => {
      clearTyping({ conversationId })
    }, 2000)
  }

  const handleSend = async () => {
    if (!text.trim()) return

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
    clearTyping({ conversationId })

    await sendMessage({ conversationId, text })
    setText("")
  }

  return (
    <div className="p-4 border-t bg-gray-50">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend()
          }}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition shadow-sm"
        >
          Send
        </button>
      </div>
    </div>
  )
}