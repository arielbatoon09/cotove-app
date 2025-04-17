"use client";

import { useAuth } from "@/components/providers/auth-provider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return null;
  }

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      {children}
    </main>
  )
}