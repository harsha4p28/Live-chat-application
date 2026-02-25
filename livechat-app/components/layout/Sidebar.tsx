import ConversationItem from "@/components/conversations/ConversationItem"
import UserSearch from "@/components/users/UserSearch"

export default function Sidebar() {
  return (
    <div className="flex flex-col w-full">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Chats</h2>
      </div>
      <div className="p-4">
        <UserSearch />
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 px-4 pb-4">
        <ConversationItem name="Alex Johnson" lastMessage="Hey, how are you?" />
        <ConversationItem name="Sarah Lee" lastMessage="See you tomorrow!" />
        <ConversationItem name="David Kim" lastMessage="Got it " />
      </div>
    </div>
  )
}