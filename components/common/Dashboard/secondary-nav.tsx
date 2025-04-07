"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { SecondaryNavProps } from "@/types/navigations"

export function SecondaryNav({ items, className, ...props }: SecondaryNavProps) {
  return (
    <nav 
      className={cn(
        "flex items-center gap-2 overflow-x-auto px-4 py-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-muted-foreground inline-flex h-8 items-center rounded-md px-2.5 py-1 text-sm transition-colors hover:text-foreground",
            item.isActive && "bg-secondary text-secondary-foreground hover:text-secondary-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
} 