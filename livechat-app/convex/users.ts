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
    return await ctx.db.query("users").collect();
  },
});

export const searchUsers = query({
  args: {
    search: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect()

    return users.filter(
      (user) =>
        user.clerkId !== args.clerkId &&
        user.name.toLowerCase().includes(args.search.toLowerCase())
    )
  },
})