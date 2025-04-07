import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader, DashboardSidebar } from "@/components/common/Dashboard";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "/avatars/logo-sample.jpg",
    shop: {
      name: "Yellow Clothing Storesssssssssssssssssssss",
      plan: "Free Plan"
    }
  };

  return (
    <main className="h-[100vh]">
      <SidebarProvider className="flex flex-col">
        <DashboardHeader user={user} />
        <div className="flex flex-1 px-4 pt-6">
          <DashboardSidebar />
          <SidebarInset>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </main>
  )
}