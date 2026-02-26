export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-b from-gray-50 via-white to-gray-50 p-6">
      <div className="max-w-md text-center">
        <svg
          className="mx-auto h-16 w-16 text-blue-500 opacity-50 mb-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          No conversation selected
        </h1>
        <p className="text-gray-500">
          Select a conversation from the sidebar to start chatting.
        </p>
      </div>
    </div>
  )
}