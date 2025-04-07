export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Store Builder</h1>
      <p className="text-xl text-gray-600 mb-8">Create and manage your own online store</p>
      <div className="flex gap-4">
        <a
          href="https://app.localhost:3000"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Go to Dashboard
        </a>
        <a
          href="https://admin.localhost:3000"
          className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Admin Panel
        </a>
      </div>
    </div>
  )
} 