"use client"

// Dependencies
import Link from "next/link"
import { useState } from "react"
import { ChevronRight } from "lucide-react"

// Utils
import { cn } from "@/lib/utils"

// Types
import { NavigationGroup } from "@/types/navigations"

// Components
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { SidebarGroup, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from "@/components/ui/sidebar"

interface DashboardNavigationProps {
  items: NavigationGroup[]
}

export function DashboardNavigation({ items }: DashboardNavigationProps) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const handleToggle = (groupIndex: number, itemIndex: number) => {
    const newIndex = `${groupIndex}-${itemIndex}`;
    setOpenIndex(openIndex === newIndex ? null : newIndex);
  };

  return (
    <div className="space-y-6">
      {items.map((group, groupIndex) => (
        <div key={group.label || groupIndex} className="space-y-2">
          {group.label && (
            <div className="px-3">
              <p className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                {group.label}
              </p>
            </div>
          )}
          <SidebarGroup>
            <SidebarMenu>
              {group.items.map((item, itemIndex) => (
                <Collapsible
                  key={item.title}
                  asChild
                  open={openIndex === `${groupIndex}-${itemIndex}`}
                  onOpenChange={() => handleToggle(groupIndex, itemIndex)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        asChild={!item.items?.length}
                        tooltip={item.title}
                        className={cn(
                          item.isActive && "bg-sidebar-accent text-sidebar-accent-foreground cursor-pointer"
                        )}
                      >
                        {item.items?.length ? (
                          <div className="flex items-center gap-2 w-full cursor-pointer">
                            <item.icon className={cn(
                              item.isActive ? "text-primary w-5 h-5" : "text-foreground/70 w-5 h-5"
                            )} />
                            <span>{item.title}</span>
                          </div>
                        ) : (
                          <Link href={item.url} className="flex items-center gap-2">
                            <item.icon className={cn(
                              item.isActive ? "text-primary w-5 h-5" : "text-foreground/70 w-5 h-5"
                            )} />
                            <span>{item.title}</span>
                          </Link>
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items?.length ? (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90 transition-transform duration-200 ease-in-out hover:bg-transparent" disabled>
                            <ChevronRight />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="transition-all duration-300 overflow-hidden">
                          <SidebarMenuSub>
                            {item.items?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  className={cn(
                                    subItem.isActive && "bg-sidebar-accent/50 font-medium text-sidebar-accent-foreground"
                                  )}
                                >
                                  <Link href={subItem.url}>
                                    <span className={cn(
                                      subItem.isActive && "text-primary"
                                    )}>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </div>
      ))}
    </div>
  )
} 