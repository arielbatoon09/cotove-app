import { OnboardingTask } from "@/types/onboarding"

export const onboardingTasks: OnboardingTask[] = [
  {
    id: "setup-store",
    title: "Setup Your Store",
    description: "Configure your store settings, branding, and preferences",
    href: "/dashboard/store/settings",
    isCompleted: false,
    order: 1
  },
  {
    id: "add-products",
    title: "Add Your First Product",
    description: "Create and publish your first product listing",
    href: "/dashboard/products/new",
    isCompleted: false,
    order: 2
  },
  {
    id: "setup-payments",
    title: "Setup Payment Methods",
    description: "Configure payment gateways to accept payments",
    href: "/dashboard/settings/payments",
    isCompleted: false,
    order: 3
  },
  {
    id: "setup-shipping",
    title: "Configure Shipping",
    description: "Set up shipping methods and rates",
    href: "/dashboard/settings/shipping",
    isCompleted: false,
    order: 4
  },
  {
    id: "customize-store",
    title: "Customize Store Appearance",
    description: "Personalize your store's look and feel",
    href: "/dashboard/store/appearance",
    isCompleted: false,
    order: 5
  }
] 