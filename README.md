# Live Chat App

A real-time one-on-one chat application built with **Next.js**, **Convex**, and **Clerk**.

## Tech Stack

- **Frontend** : Next.js 15 (App Router), Tailwind CSS
- **Backend** : Convex (real-time database + serverless functions)
- **Auth** : Clerk (email + social login)
- **Deployment** : Vercel (frontend), Convex Cloud (backend)

## Features

### Authentication
Sign up and log in with email or social providers via Clerk. The logged-in user's name and avatar are displayed in the sidebar. On first sign-in, the user profile is automatically synced into Convex so other users can discover them.

### User List & Search
All registered users (excluding yourself) are discoverable via the search bar. Results filter in real time as you type. Clicking a user opens an existing conversation or creates a new one instantly.

### One-on-One Direct Messages
Private real-time conversations powered by Convex WebSocket subscriptions. Messages appear on both sides instantly with no page refresh. The sidebar lists all conversations with a preview of the most recent message, sorted by latest activity.

### Message Timestamps
Smart timestamp formatting on every message:
- Today's messages show time only : `2:34 PM`
- Older messages from the same year show date + time : `Feb 15, 2:34 PM`
- Messages from a different year include the full year : `Feb 15 2024, 2:34 PM`

### Empty States
No blank screens anywhere in the app:
- No conversations yet : shown on first sign-in
- No messages yet : shown when a conversation has no messages
- No search results : shown when user search returns nothing
- No conversation selected: shown on desktop when no chat is open

### Responsive Layout
- **Desktop** : sidebar and chat area side by side
- **Mobile** : conversation list as the default view; tapping a conversation opens a full-screen chat with a back button to return to the list
- Built with Tailwind CSS responsive breakpoints (`md:`)

### Online / Offline Status
A green dot indicator shows which users currently have the app open. Presence is updated every 15 seconds via a silent background component. The dot disappears automatically ~60 seconds after a user closes the app. Shown on both the sidebar conversation list and the conversation header.

### Typing Indicator
Shows `"[Name] is typing..."` with a pulsing three-dot animation when the other user is actively typing. Disappears automatically after 2 seconds of inactivity or immediately when the message is sent.

### Unread Message Count
A blue badge on each conversation in the sidebar shows the number of unread messages. The badge clears the moment you open that conversation. Updates in real time as new messages arrive.

### Smart Auto-Scroll
New messages automatically scroll into view when they arrive — but only if you're already at the bottom of the chat. If you've scrolled up to read older messages, a `↓ New messages` button appears instead. Clicking it jumps you back to the latest message without losing your scroll position.

###  Message Reactions
Hover over any message to reveal a reaction picker with 👍 ❤ 😂 😮 😢. Click an emoji to toggle your reaction on or off. Reactions are grouped and displayed with a count below the message bubble, visible to both sides in real time.

###  Delete Own Messages
Hover over any message you sent to reveal a delete option. Deleting a message replaces its content with *"This message was deleted"* for both users — the message is soft-deleted so the conversation history remains intact without showing the original text.

## Getting Started

### Prerequisites
- Node.js 18+
- A [Convex](https://convex.dev) account
- A [Clerk](https://clerk.com) account

### Installation

```bash
git clone https://github.com/your-username/live-chat-app.git
cd live-chat-app/livechat-app
npm install
```

### Environment Variables

Create a `.env.local` file in the `livechat-app` directory:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_JWT_ISSUER_DOMAIN=https://your-app.clerk.accounts.dev
```

### Run Locally

```bash
# Start Convex dev server
npx convex dev

# In a separate terminal, start Next.js
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### 1. Deploy Convex backend

```bash
npx convex deploy
```

### 2. Deploy to Vercel

Push to GitHub and import the repo on [vercel.com](https://vercel.com). Set the root directory to `livechat-app` and add the environment variables from above using your production Clerk keys (`pk_live_` / `sk_live_`).

Set the build command to:

```bash
npx convex deploy && next build
```
