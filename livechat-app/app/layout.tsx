"use client";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import "./globals.css";
import SyncUser from "@/hooks/useSyncUser";
import PresenceUpdater from "@/components/users/PresenceUpdater";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <ConvexClientProvider>
            <SyncUser />
            <PresenceUpdater />
            {children}
            </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
