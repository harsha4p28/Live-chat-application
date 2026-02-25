import { Id } from "@/convex/_generated/dataModel"
import MessageList from "@/components/messages/MessageList"
import MessageInput from "@/components/messages/MessageInput"
import ConversationHeader from "@/components/conversations/ConversationHeader"

type Props = {
  params: Promise<{
    conversationId: string
  }>
}

export default async function ConversationPage({ params }: Props) {
  const { conversationId } = await params
  const id = conversationId as Id<"conversations">

  return (
    <div className="flex flex-col h-full">
      
      <div className="shrink-0">
        <ConversationHeader conversationId={id} />
      </div>

      <div className="flex-1 overflow-y-auto">
        <MessageList conversationId={id} />
      </div>

      <div className="shrink-0">
        <MessageInput conversationId={id} />
      </div>

    </div>
  )
}