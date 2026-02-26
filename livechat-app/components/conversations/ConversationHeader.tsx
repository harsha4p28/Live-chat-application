"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Props = {
  conversationId: Id<"conversations">;
};

export default function ConversationHeader({ conversationId }: Props) {
  const recipient = useQuery(api.conversations.getConversationDetails, {
    conversationId,
  });
  const router = useRouter();

  if (!recipient) return null;

  const isOnline =
    recipient.lastSeen && Date.now() - recipient.lastSeen < 20000;

  return (
    <div className="p-3.5 border-b bg-white flex items-center gap-3">
      <button
        onClick={() => router.push("/chat/")}
        className="sm:hidden p-2 rounded-full hover:bg-zinc-100 transition"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="relative">
        <img src={recipient.image} className="w-8 h-8 rounded-full" />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
        )}
      </div>
      <div className="font-semibold text-lg">{recipient.name}</div>
    </div>
  );
}
