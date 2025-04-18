"use client"

// Dependencies
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import { usePathname } from "next/navigation"

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
  const pathname = usePathname();

  // Initialize open state when active path changes
  useEffect(() => {
    items.forEach((group, groupIndex) => {
      group.items.forEach((item, itemIndex) => {
        if (item.items?.length && isSubItemActive(item)) {
          setOpenIndex(`${groupIndex}-${itemIndex}`);
        }
      });
    });
  }, []);

  const handleToggle = (groupIndex: number, itemIndex: number, hasSubItems: boolean) => {
    if (!hasSubItems) {
      setOpenIndex(null);
      return;
    }
    
    const index = `${groupIndex}-${itemIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  const isSubItemActive = (item: any) => {
    return item.items?.some((subItem: any) => subItem.url === pathname);
  };

  const isItemActive = (item: any) => {
    return item.url === pathname || isSubItemActive(item);
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
                  onOpenChange={() => handleToggle(groupIndex, itemIndex, !!item.items?.length)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        asChild={!item.items?.length}
                        tooltip={item.title}
                        className={cn(
                          !item.items?.length && isItemActive(item) && "bg-sidebar-accent text-sidebar-accent-foreground cursor-pointer"
                        )}
                      >
                        {item.items?.length ? (
                          <div className="flex items-center gap-2 w-full cursor-pointer">
                            <item.icon className={cn(
                              "w-5 h-5",
                              isItemActive(item) ? "text-primary" : "text-foreground/70"
                            )} />
                            <span className={cn(
                              isItemActive(item) ? "text-primary" : ""
                            )}>{item.title}</span>
                          </div>
                        ) : (
                          <Link href={item.url} className="flex items-center gap-2">
                            <item.icon className={cn(
                              isItemActive(item) ? "text-primary w-5 h-5" : "text-foreground/70 w-5 h-5"
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
                                    subItem.url === pathname && "bg-sidebar-accent text-sidebar-accent-foreground cursor-pointer"
                                  )}
                                >
                                  <Link href={subItem.url}>
                                    <span>{subItem.title}</span>
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