"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  messageId: Id<"messages">;
  text: string;
  isOwn: boolean;
  time: string;
  reactions?: { value: string; count: number }[];
};

export default function MessageItem({
  messageId,
  text,
  isOwn,
  time,
  reactions,
}: Props) {
  const EMOJIS = ["👍", "❤", "😂", "😮", "😢"];

  const toggleReaction = useMutation(api.reactions.toggleReaction);

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} px-2`}>
      <div className="flex flex-col max-w-xs sm:max-w-sm group relative">
        <div
          className={`relative px-4 py-2 rounded-2xl text-sm shadow-sm ${
            isOwn
              ? "bg-blue-500 text-white rounded-br-none"
              : "bg-zinc-200 text-zinc-900 rounded-bl-none"
          }`}
        >
          <div className="break-words">{text}</div>

          <div
            className={`mt-1 text-[10px] flex justify-end ${
              isOwn ? "text-white/70" : "text-zinc-500"
            }`}
          >
            {time}
          </div>
        </div>

        {reactions && reactions.length > 0 && (
          <div className="flex gap-2 mt-1 px-2 py-1 bg-zinc-100 rounded-full text-xs shadow-sm w-fit">
            {reactions.map((reaction) => (
              <span key={reaction.value}>
                {reaction.value} {reaction.count}
              </span>
            ))}
          </div>
        )}

        <div
          className={`
          absolute -top-10 
          ${isOwn ? "right-0" : "left-0"}
          bg-white shadow-md rounded-full px-3 py-1 
          flex gap-2 
          opacity-0 scale-95 
          group-hover:opacity-100 group-hover:scale-100
          transition-all duration-200
          z-20
        `}
        >
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => toggleReaction({ messageId, value: emoji })}
              className="text-sm hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
