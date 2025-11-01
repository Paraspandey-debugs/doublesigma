"use client";

import { useState } from "react";
import Header from "../../components/Header";

export default function SearchProperty() {
  const [ulpin, setUlpin] = useState("");
  const [searchResult, setSearchResult] = useState<any>(null);
  const [toast, setToast] = useState<string | null>(null);

  const searchProperty = async () => {
    // Placeholder for search logic
    // In real implementation, query blockchain + Mongo
    setSearchResult({
      ulpin,
      owner: "0x1234...abcd",
      coordinates: "40.7128, -74.0060",
      status: "Active",
      docHash: "hash123456"
    });
    setToast("Property found!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6">
          Search Property Records
        </h1>

        {toast && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {toast}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Search by ULPIN</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter ULPIN"
              value={ulpin}
              onChange={(e) => setUlpin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={searchProperty}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Search Property
            </button>
          </div>
        </div>

        {searchResult && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Property Information</h2>
            <div className="space-y-2">
              <p><strong>ULPIN:</strong> {searchResult.ulpin}</p>
              <p><strong>Owner:</strong> {searchResult.owner}</p>
              <p><strong>Coordinates:</strong> {searchResult.coordinates}</p>
              <p><strong>Status:</strong> {searchResult.status}</p>
              <p><strong>Document Hash:</strong> {searchResult.docHash}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}