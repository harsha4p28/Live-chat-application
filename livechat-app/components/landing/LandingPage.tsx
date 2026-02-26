"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 px-6">
      <Badge className="mb-4">Real-Time Messaging</Badge>

      <h1 className="text-4xl font-bold text-center mb-4">
        Live Chat Application
      </h1>

      <p className="text-zinc-600 text-center max-w-md mb-8">
        Secure one-on-one messaging built with Next.js, Convex and Clerk.
        Real-time updates. Online status. Clean UI.
      </p>

      <div className="flex gap-4 mb-10">
        <SignInButton mode="modal" fallbackRedirectUrl="/chat">
          <Button className="hover:scale-105 transition-transform duration-200 cursor-pointer">
            Sign In
          </Button>
        </SignInButton>

        <SignUpButton mode="modal" fallbackRedirectUrl="/chat">
          <Button
            variant="outline"
            className="hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            Sign Up
          </Button>
        </SignUpButton>
      </div>

      <Separator className="my-8 w-full max-w-md" />

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full">
        <Card className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Real-Time Messaging</h3>
            <p className="text-sm text-zinc-500">
              Messages update instantly using Convex subscriptions.
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Online Status</h3>
            <p className="text-sm text-zinc-500">
              See when users are active with live presence tracking.
            </p>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-2">Secure Auth</h3>
            <p className="text-sm text-zinc-500">
              Authentication powered by Clerk.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
