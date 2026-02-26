import { mutation } from "./_generated/server"
import { v } from "convex/values"

export const toggleReaction = mutation({
  args: {
    messageId: v.id("messages"),
    value: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", q =>
        q.eq("clerkId", identity.subject)
      )
      .unique()

    if (!user) throw new Error("User not found")

    const existing = await ctx.db
      .query("reactions")
      .withIndex("by_user_message", q =>
        q.eq("userId", user._id)
         .eq("messageId", args.messageId)
      )
      .unique()

    if (existing && existing.value === args.value) {
      await ctx.db.delete(existing._id)
      return
    }

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.value,
      })
      return
    }

    await ctx.db.insert("reactions", {
      messageId: args.messageId,
      userId: user._id,
      value: args.value,
    })
  },
})