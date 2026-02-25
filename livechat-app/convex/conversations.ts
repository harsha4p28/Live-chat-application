import { mutation, query } from "./_generated/server"
import { v } from "convex/values"

export const getUserConversations = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return []

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique()

    if (!currentUser) return []

    const memberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_user", (q) =>
        q.eq("userId", currentUser._id)
      )
      .collect()

    const conversations = await Promise.all(
      memberships.map(async (membership) => {
        const members = await ctx.db
          .query("conversationMembers")
          .withIndex("by_conversation", (q) =>
            q.eq("conversationId", membership.conversationId)
          )
          .collect()

        const otherMember = members.find(
          (m) => m.userId !== currentUser._id
        )

        const otherUser = otherMember
          ? await ctx.db.get(otherMember.userId)
          : null

        const lastMessage = await ctx.db
          .query("messages")
          .withIndex("by_conversation", (q) =>
            q.eq("conversationId", membership.conversationId)
          )
          .order("desc")
          .first()

        return {
          conversationId: membership.conversationId,
          name: otherUser?.name ?? "Unknown",
          lastMessage: lastMessage?.text ?? "No messages yet",
        }
      })
    )

    return conversations
  },
})

export const getOrCreateConversation = mutation({
  args: {
    otherUserId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) throw new Error("Unauthorized")

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique()

    if (!currentUser) throw new Error("User not found")

    const currentMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_user", (q) =>
        q.eq("userId", currentUser._id)
      )
      .collect()

    for (const membership of currentMemberships) {
      const members = await ctx.db
        .query("conversationMembers")
        .withIndex("by_conversation", (q) =>
          q.eq("conversationId", membership.conversationId)
        )
        .collect()

      const memberIds = members.map((m) => m.userId)

      if (
        memberIds.includes(currentUser._id) &&
        memberIds.includes(args.otherUserId) &&
        memberIds.length === 2
      ) {
        return membership.conversationId
      }
    }

    const conversationId = await ctx.db.insert("conversations", {
      isGroup: false,
      createdAt: Date.now(),
    })

    await ctx.db.insert("conversationMembers", {
      conversationId,
      userId: currentUser._id,
    })

    await ctx.db.insert("conversationMembers", {
      conversationId,
      userId: args.otherUserId,
    })

    return conversationId
  },
})

export const getConversationDetails = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) return null

    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique()

    if (!currentUser) return null

    const members = await ctx.db
      .query("conversationMembers")
      .withIndex("by_conversation", (q) =>
        q.eq("conversationId", args.conversationId)
      )
      .collect()

    const otherMember = members.find(
      (m) => m.userId !== currentUser._id
    )

    if (!otherMember) return null

    const otherUser = await ctx.db.get(otherMember.userId)

    return otherUser
  },
})