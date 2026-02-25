"use client"

import { useState } from "react"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  conversationId: Id<"conversations">
}

export default function MessageInput({ conversationId }: Props) {
  const [text, setText] = useState("")
  const sendMessage = useMutation(api.messages.sendMessage)

  const handleSend = async () => {
    if (!text.trim()) return

    await sendMessage({
      conversationId,
      text,
    })

    setText("")
  }

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend()
          }}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  )
}