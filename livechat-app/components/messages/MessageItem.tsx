type Props = {
  text: string
  isOwn: boolean
}

export default function MessageItem({ text, isOwn }: Props) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
          isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-zinc-200 text-black rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  )
}