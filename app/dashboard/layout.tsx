import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Dashboard - Store Builder Platform",
  description: "Manage your store on Store Builder Platform",
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-gray-50">
          <div className="flex h-16 items-center border-b px-6">
            <span className="text-lg font-bold">Store Dashboard</span>
          </div>
          <nav className="space-y-1 p-4">
            <a href="/app/dashboard" className="block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100">
              Dashboard
            </a>
            <a href="/app/products" className="block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100">
              Products
            </a>
            <a href="/app/orders" className="block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100">
              Orders
            </a>
            <a href="/app/settings" className="block rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100">
              Settings
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-16 border-b">
            {/* Top navigation */}
            <div className="flex h-full items-center justify-end px-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm">Store Owner</span>
              </div>
            </div>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
} 