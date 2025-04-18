import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { DashboardHeader, DashboardSidebar } from "@/components/common/Dashboard";
import { AuthWrapper } from "@/components/providers/auth-wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Your App Name",
  description: "Dashboard for managing your account",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "/avatars/logo-sample.jpg",
    shop: {
      name: "Yellow Clothing Store",
      plan: "Free Plan"
    }
  };

  return (
    <AuthWrapper variant="protected">
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
    </AuthWrapper>
  );
}