import { mutation } from "./_generated/server"
import { v } from "convex/values"

export const getOrCreateConversation = mutation({
  args: {
    currentUserId: v.id("users"),
    otherUserId: v.id("users"),
  },
  handler: async (ctx, args) => {

    const memberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_user", (q) => q.eq("userId", args.currentUserId))
      .collect()

    for (const member of memberships) {
      const members = await ctx.db
        .query("conversationMembers")
        .withIndex("by_conversation", (q) =>
          q.eq("conversationId", member.conversationId)
        )
        .collect()

      const userIds = members.map((m) => m.userId)

      if (
        userIds.length === 2 &&
        userIds.includes(args.currentUserId) &&
        userIds.includes(args.otherUserId)
      ) {
        return member.conversationId
      }
    }

    const conversationId = await ctx.db.insert("conversations", {
      isGroup: false,
      createdAt: Date.now(),
    })

    await ctx.db.insert("conversationMembers", {
      conversationId,
      userId: args.currentUserId,
    })

    await ctx.db.insert("conversationMembers", {
      conversationId,
      userId: args.otherUserId,
    })

    return conversationId
  },
})