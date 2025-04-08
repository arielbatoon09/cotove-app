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
        url: "/",
        icon: Home,
        isActive: true,
      },
      {
        title: "Overview",
        url: "/dashboard/overview",
        icon: BarChart3,
      },
    ],
  },

  // Management
  {
    label: "Management",
    items: [
      {
        title: "Products",
        url: "/dashboard/products",
        icon: Package,
        items: [
          {
            title: "All Products",
            url: "/dashboard/products",
          },
          {
            title: "Add New",
            url: "/dashboard/products/new",
          },
          {
            title: "Categories",
            url: "/dashboard/products/categories",
          },
        ],
      },
      {
        title: "Orders",
        url: "/dashboard/orders",
        icon: ShoppingCart,
        items: [
          {
            title: "All Orders",
            url: "/dashboard/orders",
          },
          {
            title: "Pending",
            url: "/dashboard/orders/pending",
          },
          {
            title: "Completed",
            url: "/dashboard/orders/completed",
          },
        ],
      },
      {
        title: "Customers",
        url: "/dashboard/customers",
        icon: Users,
        items: [
          {
            title: "All Customers",
            url: "/dashboard/customers",
          },
          {
            title: "Add Customer",
            url: "/dashboard/customers/new",
          },
        ],
      },
    ],
  },

  // Team & Store
  {
    label: "Team & Store",
    items: [
      {
        title: "Team",
        url: "/dashboard/team",
        icon: Users2,
        items: [
          {
            title: "Members",
            url: "/dashboard/team",
          },
          {
            title: "Invite",
            url: "/dashboard/team/invite",
          },
          {
            title: "Roles",
            url: "/dashboard/team/roles",
          },
        ],
      },
      {
        title: "Store",
        url: "/dashboard/store",
        icon: Store,
        items: [
          {
            title: "Appearance",
            url: "/dashboard/store/appearance",
          },
          {
            title: "Pages",
            url: "/dashboard/store/pages",
          },
          {
            title: "Marketing",
            url: "/dashboard/marketing",
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
        items: [
          {
            title: "General",
            url: "/dashboard/settings/general",
          },
          {
            title: "Payments",
            url: "/dashboard/settings/payments",
          },
          {
            title: "Shipping",
            url: "/dashboard/settings/shipping",
          },
        ],
      },
      {
        title: "Help",
        url: "/dashboard/help",
        icon: HelpCircle,
      },
    ],
  },
] 