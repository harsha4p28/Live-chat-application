"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SyncUser() {
  const { isSignedIn, isLoaded } = useUser();
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      createUser();
    }
  }, [isLoaded, isSignedIn, createUser]);

  return null;
}