"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function UsersPage() {
  const users = useQuery(api.users.getUsers);
  if (!users) return <div>Loading...</div>;

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}