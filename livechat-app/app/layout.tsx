"use client";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import "./globals.css";
import SyncUser from "@/hooks/useSyncUser";

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
            {children}
            </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
