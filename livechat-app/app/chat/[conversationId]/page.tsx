import { Id } from "@/convex/_generated/dataModel"
import MessageList from "@/components/messages/MessageList"
import MessageInput from "@/components/messages/MessageInput"
import ConversationHeader from "@/components/conversations/ConversationHeader"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{
    conversationId: string
  }>
}

export default async function ConversationPage({ params }: Props) {
   const { userId } = await auth()

  if (!userId) {
    redirect("/")
  }
  const { conversationId } = await params
  const id = conversationId as Id<"conversations">

  return (
    <div className="flex flex-col h-full bg-gray-50">
      
      <div className="shrink-0">
        <ConversationHeader conversationId={id} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <MessageList conversationId={id}  />
        </div>

        <div className="shrink-0 bg-gray-50 border-t border-gray-200">
          <MessageInput conversationId={id} />
        </div>
      </div>

    </div>
  )
}