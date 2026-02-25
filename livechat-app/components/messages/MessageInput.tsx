export default function MessageInput() {
  return (
    <div className="p-4 border-t bg-white">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
          Send
        </button>
      </div>
    </div>
  )
}