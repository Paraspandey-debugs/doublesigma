export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6">
          Government Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Property Registration</h2>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
              Register New Property
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Ownership Transfer</h2>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Initiate Transfer
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Dispute Management</h2>
            <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors">
              Flag Dispute
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Property Search</h2>
            <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
              Search Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}