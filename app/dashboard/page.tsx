export default function AppDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-2">Total Products</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-2">Revenue</h2>
          <p className="text-3xl font-bold">$0</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-lg font-semibold mb-2">Customers</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
        <div className="rounded-lg border">
          <div className="p-6 text-center text-gray-500">
            No orders yet
          </div>
        </div>
      </div>
    </div>
  )
} 