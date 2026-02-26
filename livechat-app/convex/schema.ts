import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({

  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    image: v.string(),
    lastSeen: v.optional(v.number()),
  })
    .index("by_clerkId", ["clerkId"]),


  conversations: defineTable({
    isGroup: v.boolean(),
    name: v.optional(v.string()),
    createdAt: v.number(),
  }),


  conversationMembers: defineTable({
    conversationId: v.id("conversations"),
    userId: v.id("users"),
  })
    .index("by_conversation", ["conversationId"])
    .index("by_user", ["userId"]),


  messages: defineTable({
    conversationId: v.id("conversations"),
    senderId: v.id("users"),
    text: v.string(),
    createdAt: v.number(),
    deleted: v.optional(v.boolean()),
  })
    .index("by_conversation", ["conversationId"]),

  reactions: defineTable({
    messageId: v.id("messages"),
    userId: v.id("users"),
    value: v.string(), 
  })
    .index("by_message", ["messageId"])
    .index("by_user_message", ["userId", "messageId"]),


  conversationReads: defineTable({
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    lastReadAt: v.number(),
  })
    .index("by_user_conversation", ["userId", "conversationId"])
    .index("by_conversation", ["conversationId"]),
})