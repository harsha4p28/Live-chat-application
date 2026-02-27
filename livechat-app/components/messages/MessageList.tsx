"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import MessageItem from "./MessageItem";
import { Id } from "@/convex/_generated/dataModel";
import { useEffect, useRef, useState, useCallback } from "react";
import { ClipLoader } from "react-spinners";

type Props = {
  conversationId: Id<"conversations">;
};

function formatMessageTime(timestamp: number) {
  const messageDate = new Date(timestamp);
  const now = new Date();
  const isToday = messageDate.toDateString() === now.toDateString();
  const isSameYear = messageDate.getFullYear() === now.getFullYear();

  if (isToday) {
    return messageDate.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  }
  if (isSameYear) {
    return messageDate.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }
  return messageDate.toLocaleString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

const SCROLL_THRESHOLD = 80;

export default function MessageList({ conversationId }: Props) {
  const messages = useQuery(
    api.messages.getMessages,
    conversationId ? { conversationId } : "skip",
  );
  const currentUser = useQuery(api.users.getCurrentUser);
  const markAsRead = useMutation(api.conversations.markAsRead);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const isAtBottomRef = useRef(true);
  const [showNewMessages, setShowNewMessages] = useState(false);

  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distanceFromBottom <= SCROLL_THRESHOLD;
    isAtBottomRef.current = atBottom;

    if (atBottom) setShowNewMessages(false);
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    bottomRef.current?.scrollIntoView({ behavior });
    setShowNewMessages(false);
    isAtBottomRef.current = true;
  }, []);

  const prevMessageCountRef = useRef(0);

  useEffect(() => {
    if (!messages) return;

    const isFirstLoad = prevMessageCountRef.current === 0;
    const hasNewMessages = messages.length > prevMessageCountRef.current;
    prevMessageCountRef.current = messages.length;

    if (isFirstLoad) {
      scrollToBottom("instant");
      return;
    }

    if (!hasNewMessages) return;

    if (isAtBottomRef.current) {
      scrollToBottom("smooth");
    } else {
      setShowNewMessages(true);
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!messages || !conversationId) return;
    markAsRead({ conversationId });
  }, [messages, conversationId, markAsRead]);

  if (!messages || !currentUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <ClipLoader size={40} />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-2">
        <div className="text-4xl">👋</div>
        <p className="text-sm font-medium">No messages yet</p>
        <p className="text-xs">Say hello to start the conversation!</p>
      </div>
    );
  }
  return (
    <div className="relative h-full overflow-hidden">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <MessageItem
            key={message._id}
            messageId={message._id}
            text={message.text}
            isOwn={message.senderId === currentUser._id}
            time={formatMessageTime(message.createdAt)}
            reactions={message.reactions}
            deleted={message.deleted}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {showNewMessages && (
        <button
          onClick={() => scrollToBottom("smooth")}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-full shadow-lg transition-all"
        >
          ↓ New messages
        </button>
      )}
    </div>
  );
}
