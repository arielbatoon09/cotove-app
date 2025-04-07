import { LucideIcon } from "lucide-react"
import { ComponentPropsWithoutRef } from "react"

export type NavigationSubItem = {
  title: string
  url: string
  isActive?: boolean
}

export type NavigationItem = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items?: NavigationSubItem[]
}

export type NavigationGroup = {
  label?: string
  items: NavigationItem[]
}

export type NavigationItems = NavigationGroup[]

// Secondary Navigation Types
export type SecondaryNavItem = {
  title: string
  href: string
  isActive?: boolean
}

export interface SecondaryNavProps extends ComponentPropsWithoutRef<"nav"> {
  items: SecondaryNavItem[]
}
