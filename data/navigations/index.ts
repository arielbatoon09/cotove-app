import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Store,
  Megaphone,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  Users2,
} from "lucide-react"
import { NavigationItems } from "@/types/navigations"

export const navigationItems: NavigationItems = [
  // Overview
  {
    label: "Overview",
    items: [
      {
        title: "Home",
        url: "/dashboard",
        icon: Home,
        isActive: false,
      },
      {
        title: "Overview",
        url: "/dashboard/overview",
        icon: BarChart3,
        isActive: false,
      },
    ],
  },

  // Management
  {
    label: "Main Menu",
    items: [
      {
        title: "Products",
        url: "/dashboard/products",
        icon: Package,
        isActive: false,
        items: [
          {
            title: "All Products",
            url: "/dashboard/products",
            isActive: false,
          },
          {
            title: "Add New",
            url: "/dashboard/products/new",
            isActive: false,
          },
          {
            title: "Categories",
            url: "/dashboard/products/categories",
            isActive: false,
          },
          {
            title: "Promotional",
            url: "/dashboard/products/promotional",
            isActive: false,
          },
        ],
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
        icon: ShoppingCart,
        isActive: false,
        items: [
          {
            title: "All Orders",
            url: "/dashboard/orders",
            isActive: false,
          },
          {
            title: "Pending",
            url: "/dashboard/orders/pending",
            isActive: false,
          },
          {
            title: "Completed",
            url: "/dashboard/orders/completed",
            isActive: false,
          },
        ],
      },
      {
        title: "Customers",
        url: "/dashboard/customers",
        icon: Users,
        isActive: false,
        items: [
          {
            title: "All Customers",
            url: "/dashboard/customers",
            isActive: false,
          },
          {
            title: "Add Customer",
            url: "/dashboard/customers/new",
            isActive: false,
          },
        ],
      },
    ],
  },

  // Store
  {
    label: "Store Management",
    items: [
      {
        title: "Store",
        url: "/dashboard/store",
        icon: Store,
        isActive: false,
        items: [
          {
            title: "Pages",
            url: "/dashboard/store/pages",
            isActive: false,
          },
          {
            title: "Global",
            url: "/dashboard/store/global",
            isActive: false,
          },
          {
            title: "Appearance",
            url: "/dashboard/store/appearance",
            isActive: false,
          },
          {
            title: "Settings",
            url: "/dashboard/store/settings",
            isActive: false,
          },
        ],
      },
      {
        title: "Team",
        url: "/dashboard/team",
        icon: Users2,
        isActive: false,
        items: [
          {
            title: "Members",
            url: "/dashboard/team",
            isActive: false,
          },
          {
            title: "Invite",
            url: "/dashboard/team/invite",
            isActive: false,
          },
          {
            title: "Roles",
            url: "/dashboard/team/roles",
            isActive: false,
          },
        ],
      },
    ],
  },

  // Settings & Support
  {
    label: "Settings & Support",
    items: [
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        isActive: false,
        items: [
          {
            title: "General",
            url: "/dashboard/settings/general",
            isActive: false,
          },
          {
            title: "Payments",
            url: "/dashboard/settings/payments",
            isActive: false,
          },
          {
            title: "Shipping",
            url: "/dashboard/settings/shipping",
            isActive: false,
          },
        ],
      },
      {
        title: "Help",
        url: "/dashboard/help",
        icon: HelpCircle,
        isActive: false,
      },
    ],
  },
] 