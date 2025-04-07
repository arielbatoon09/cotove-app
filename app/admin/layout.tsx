import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Admin - Store Builder Platform",
  description: "Admin panel for Store Builder Platform",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="ml-auto flex items-center space-x-4">
            {/* Add admin navigation items here */}
            <nav className="flex items-center space-x-4">
              <a href="/dashboard" className="text-sm font-medium">Dashboard</a>
              <a href="/stores" className="text-sm font-medium">Stores</a>
              <a href="/users" className="text-sm font-medium">Users</a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
} 