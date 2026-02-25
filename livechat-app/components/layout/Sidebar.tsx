"use client";

import ConversationItem from "@/components/conversations/ConversationItem";
import UserSearch from "@/components/users/UserSearch";
import { api } from "@/convex/_generated/api";
import { UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { ClipLoader } from "react-spinners";

export default function Sidebar() {
  const users = useQuery(api.users.getUsers);

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center p-4 border-b bg-white">
        <div className="font-semibold text-lg">Live Chat</div>
        <UserButton />
      </div>
      <div className="p-4">
        <UserSearch />
      </div>
      <div className="flex-1 overflow-y-auto space-y-2 px-4 pb-4">
        {users ? (
          users.map((user) => (
            <ConversationItem key={user._id} name={user.name} lastMessage="" />
          ))
        ) : (
          <div className="flex justify-center items-center">
            <ClipLoader color="#000" size={30} />
          </div>
        )}
      </div>
    </div>
  );
}
