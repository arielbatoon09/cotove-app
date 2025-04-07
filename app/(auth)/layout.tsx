export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      {children}
    </main>
  )
}
