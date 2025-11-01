export default function CommonUser() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6">
          Common User Dashboard
        </h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Verify Property</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="ulpin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enter ULPIN (Unique Land Parcel Identification Number)
                </label>
                <input
                  type="text"
                  id="ulpin"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., ULPIN123456"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Verify Property
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Recent Verifications</h2>
            <p className="text-gray-600 dark:text-gray-400">No recent verifications.</p>
          </div>
        </div>
      </div>
    </div>
  );
}