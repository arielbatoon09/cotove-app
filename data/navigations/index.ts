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
} from "lucide-react"
import { NavigationItems } from "@/types/navigations"

export const navigationItems: NavigationItems = [
  // Overview Group
  {
    label: "Overview",
    items: [
      {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: true,
      },
    ],
  },

  // Main Operations
  {
    label: "Main Operations",
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
            title: "Add New Product",
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

  // Store Management
  {
    label: "Store Management",
    items: [
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
        ],
      },
      {
        title: "Marketing",
        url: "/dashboard/marketing",
        icon: Megaphone,
        items: [
          {
            title: "Discounts",
            url: "/dashboard/marketing/discounts",
          },
          {
            title: "Promotions",
            url: "/dashboard/marketing/promotions",
          },
        ],
      },
      {
        title: "Content",
        url: "/dashboard/content",
        icon: FileText,
        items: [
          {
            title: "Blog Posts",
            url: "/dashboard/content/blog",
          },
          {
            title: "Media",
            url: "/dashboard/content/media",
          },
        ],
      },
    ],
  },

  // Insights & Analytics
  {
    label: "Insights",
    items: [
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: BarChart3,
        items: [
          {
            title: "Overview",
            url: "/dashboard/analytics",
          },
          {
            title: "Reports",
            url: "/dashboard/analytics/reports",
          },
        ],
      },
    ],
  },

  // Support & Settings
  {
    label: "Support & Settings",
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