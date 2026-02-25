import MessageList from "@/components/messages/MessageList"
import MessageInput from "@/components/messages/MessageInput"

export default function ConversationPage() {
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="p-4 border-b font-semibold text-lg">Alex Johnson</div>
      <MessageList />
      <MessageInput />
    </div>
  )
}