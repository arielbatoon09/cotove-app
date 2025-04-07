"use client"

// Dependencies
import { BadgeCheck, Bell, ChevronDown, ChevronsUpDown, CreditCard, LogOut, Sparkles, Store } from "lucide-react";

// Utils
import { cn } from "@/lib/utils";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

interface UserProfileProps {
  user: {
    name: string
    email: string
    avatar: string
    shop?: {
      name: string
      plan: string
    }
  }
  minimal?: boolean
  className?: string
  toggleSidebar?: boolean
}

export function UserProfile({ 
  user, 
  minimal = false, 
  className,
  toggleSidebar = false
}: UserProfileProps) {
  const { toggleSidebar: toggleSidebarFn } = useSidebar()

  // Handle avatar click to toggle sidebar in mobile view if toggleSidebar is true
  const handleAvatarClick = (e: React.MouseEvent) => {
    if (minimal && toggleSidebar) {
      e.preventDefault();
      e.stopPropagation();
      toggleSidebarFn();
      return false;
    }
  };

  return (
    <div className={cn(className)}>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={toggleSidebar ? undefined : handleAvatarClick}>
              <SidebarMenuButton
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
                onClick={toggleSidebar ? handleAvatarClick : undefined}
              >
                {minimal ? (
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">{user.name}</span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronDown className="ml-auto size-4 md:block hidden" />
                    <ChevronsUpDown className="ml-auto size-4 md:hidden block" />
                  </>
                )}
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[280px] rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              
              {user.shop && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Store className="mr-2 h-4 w-4 flex-shrink-0" />
                      <div className="flex flex-1 items-center justify-between">
                        <span className="truncate mr-2 w-42">{user.shop.name}</span>
                        <span className="flex-shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {user.shop.plan}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </>
              )}
              
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Upgrade to Pro</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheck className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4 flex-shrink-0" />
                  <span className="truncate">Notifications</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4 flex-shrink-0" />
                <span className="truncate">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </div>
  )
} 