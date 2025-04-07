"use client"

import Link from "next/link"
import { Bell, MessageSquare, Menu, Store, Command } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"

import { UserProfile } from "./user-profile"

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  user?: {
    name: string
    email: string
    avatar: string
    shop?: {
      name: string
      plan: string
    }
  }
}

export function DashboardHeader({ user, className }: HeaderProps) {
  const { isMobile, state, toggleSidebar } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <header className={cn("sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4", className)}>
      {/* Logo section - shown on mobile or when sidebar is collapsed */}

      <Link 
          href="/" 
          className={cn(
            "flex items-center gap-2 py-2 font-semibold",
            isCollapsed && "justify-center"
          )}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Command className="h-4 w-4" />
          </span>
          {!isCollapsed && (
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Cotove</span>
              <span className="truncate text-xs">Builder Platform</span>
            </div>
          )}
        </Link>

      {/* Action buttons - aligned to right */}
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:flex">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 hidden md:flex">
          <MessageSquare className="h-4 w-4" />
          <span className="sr-only">Messages</span>
        </Button>
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 sm:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        {/* User profile - only shown on desktop */}
        {user && <UserProfile user={user} className="hidden sm:block" />}
      </div>
    </header>
  )
}