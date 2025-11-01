"use client";

import Link from "next/link";
import Header from "../../components/Header";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6">
          Government Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/register">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-4 text-center">Register New Property</h2>
              <div className="text-center">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Go to Register
                </button>
              </div>
            </div>
          </Link>
          <Link href="/admin/transfers">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-4 text-center">Approve Ownership Transfer</h2>
              <div className="text-center">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Go to Transfers
                </button>
              </div>
            </div>
          </Link>
          <Link href="/admin/disputes">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-4 text-center">Manage Disputes</h2>
              <div className="text-center">
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
                  Go to Disputes
                </button>
              </div>
            </div>
          </Link>
          <Link href="/admin/search">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <h2 className="text-xl font-semibold mb-4 text-center">Search Property Records</h2>
              <div className="text-center">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                  Go to Search
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}