"use client"

// Dependencies
import Link from "next/link";
import { Command } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";

// Components
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarFooter, SidebarHeader, useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { DashboardNavigation } from "./navigation";
import { UserProfile } from "./user-profile";

// Data
import { navigationItems } from "@/data/navigations";

export function DashboardSidebar() {
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "/avatars/logo-sample.jpg",
    shop: {
      name: "Modern Store",
      plan: "Pro Plan"
    }
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col px-2 py-2 gap-2">
        {/* Logo */}
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
      </SidebarHeader>

      <div className="flex-1 overflow-auto py-2">
        <DashboardNavigation items={navigationItems} />
      </div>

      <SidebarFooter>
        <div className="flex flex-col gap-2 px-2">
          <Separator />
          {/* User Profile - more prominent on mobile */}
          <div className={cn(
            "md:hidden py-2",
            isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          )}>
            <UserProfile
              user={user}
              className="w-full"
            />
          </div>

          <Button variant="outline" className="w-full">
            Upgrade to Pro
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Get access to all features
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}