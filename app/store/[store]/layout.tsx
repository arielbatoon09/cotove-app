import { Inter } from "next/font/google"
import "../../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Store",
  description: "Your store powered by Store Builder Platform",
}

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={inter.className}>
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="text-xl font-bold">Store</div>
          <div className="ml-auto flex items-center space-x-4">
            <nav className="flex items-center space-x-4">
              <a href="/" className="text-sm font-medium">Home</a>
              <a href="/products" className="text-sm font-medium">Products</a>
              <a href="/cart" className="text-sm font-medium">Cart</a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
} 