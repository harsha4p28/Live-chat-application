import { query,mutation } from "./_generated/server"
import { v } from "convex/values"

export const getMessages = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .collect()

    const messagesWithReactions = await Promise.all(
      messages.map(async (message) => {
        const reactions = await ctx.db
          .query("reactions")
          .withIndex("by_message", (q) =>
            q.eq("messageId", message._id)
          )
          .collect()

        const groupedMap = reactions.reduce(
          (acc, reaction) => {
            acc[reaction.value] =
              (acc[reaction.value] || 0) + 1
            return acc
          },
          {} as Record<string, number>
        )

        const groupedArray = Object.entries(groupedMap).map(
          ([value, count]) => ({
            value,
            count,
          })
        )   
        

        return {
          ...message,
          reactions: groupedArray,
        }
      })
    )

    return messagesWithReactions
  },
})

export const sendMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique()

    if (!user) throw new Error("User not found")

    await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      senderId: user._id,
      text: args.text,
      createdAt: Date.now(),
    })
  },
})