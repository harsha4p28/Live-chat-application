"use client";

import { useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  lastMessage: string;
  conversationId: Id<"conversations">;
  className?: string;
  profileImage: string | null;
  lastSeen?: number | null;
};

export default function ConversationItem({
  name,
  lastMessage,
  conversationId,
  className = "",
  profileImage,
  lastSeen,
}: Props) {
  const router = useRouter();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(interval);
  }, []);

  {
    typeof lastSeen === "number" && now - lastSeen < 60000 && (
      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
    );
  }

  const unreadCount =
    useQuery(api.conversations.getUnreadCount, {
      conversationId,
    }) ?? 0;
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 cursor-pointer transition-all border border-transparent hover:border-gray-200 hover:shadow-md ${className}`}
      onClick={() => router.push(`/chat/${conversationId}`)}
    >
      <div className="relative flex-shrink-0">
        <div className="w-11 h-11 rounded-full overflow-hidden bg-gray-200 ring-2 ring-white shadow-sm">
          {profileImage ? (
            <img
              src={profileImage}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm font-semibold text-gray-600">
              {name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        {typeof lastSeen === "number" && Date.now() - lastSeen < 60000 && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-gray-800 truncate">{name}</div>

          {unreadCount > 0 && (
            <div className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {unreadCount}
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500 truncate">{lastMessage}</div>
      </div>
    </div>
  );
}
