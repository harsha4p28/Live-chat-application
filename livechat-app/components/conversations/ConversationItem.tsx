type Props = {
  name: string
  lastMessage: string
}

export default function ConversationItem({ name, lastMessage }: Props) {
  return (
    <div className="p-3 rounded-xl hover:bg-zinc-100 cursor-pointer transition">
      <div className="font-medium">{name}</div>
      <div className="text-sm text-zinc-500 truncate">{lastMessage}</div>
    </div>
  )
}