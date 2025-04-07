import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar/app-sidebar";
import { SiteHeader } from "@/components/common/AppSidebar/site-header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-[100vh]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </main>
  )
}