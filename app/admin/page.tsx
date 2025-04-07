export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Total Stores</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Active Users</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Total Revenue</h2>
          <p className="text-3xl font-bold">$0</p>
        </div>
      </div>
    </div>
  )
} 