"use client"

import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"

export function DashboardSearch() {
  return (
    <form className="relative w-full">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[240px] lg:w-[340px]"
      />
    </form>
  )
} 