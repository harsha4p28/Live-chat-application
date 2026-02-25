import { mutation, query } from "./_generated/server";
import {v} from "convex/values";

export const createUser = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique();

    if (existing) return existing._id;

    return await ctx.db.insert("users", {
      clerkId: identity.subject,
      name: identity.name ?? "",
      email: identity.email ?? "",
      image: identity.pictureUrl ?? "",
    });
  },
});

export const getUsers = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) return [];

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique();

    if (!currentUser) return [];

    const users = await ctx.db.query("users").collect();

    return users.filter(
      (user) => user._id !== currentUser._id
    );
  },
});

export const searchUsers = query({
  args: {
    search: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique()

    if (!currentUser) return []

    const users = await ctx.db.query("users").collect()

    return users.filter(
      (user) =>
        user._id !== currentUser._id &&
        user.name
          .toLowerCase()
          .includes(args.search.toLowerCase())
    )
  },
})

export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      return null
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique()

    return user
  },
})

export const getUserById = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId)
    return user
  },
})

export const updatePresence = mutation({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique()

    if (!user) return

    await ctx.db.patch(user._id, {
      lastSeen: Date.now(),
    })
  },
})