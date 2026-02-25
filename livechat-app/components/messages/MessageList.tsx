import MessageItem from "./MessageItem"

export default function MessageList() {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <MessageItem text="Hello!" isOwn={false} />
      <MessageItem text="Hi 👋" isOwn={true} />
      <MessageItem text="How are you doing?" isOwn={false} />
      <MessageItem text="I'm good, thanks!" isOwn={true} />
    </div>
  )
}