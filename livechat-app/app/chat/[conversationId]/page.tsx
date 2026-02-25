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
      <ConversationHeader conversationId={id} />
      <MessageList conversationId={id} />
      <MessageInput conversationId={id} />
    </div>
  )
}