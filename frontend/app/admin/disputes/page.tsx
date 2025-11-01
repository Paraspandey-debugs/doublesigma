"use client";

import Header from "../../components/Header";

export default function ManageDisputes() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6">
          Manage Disputes
        </h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <p className="text-gray-600 dark:text-gray-400">
            Dispute management functionality will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
}