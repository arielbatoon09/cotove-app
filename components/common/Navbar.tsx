"use client"

import Link from "next/link"
import { useAuth } from "@/components/providers/auth-provider"

export function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Store Builder
          </Link>
          <nav className="flex items-center space-x-6">
            {isAuthenticated ? (
              <Link href="/dashboard" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/signup" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Get Started
                </Link>
                <Link href="/login" className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Login
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 