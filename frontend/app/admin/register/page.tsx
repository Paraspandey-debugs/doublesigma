"use client";

import { useState } from "react";
import Header from "../../components/Header";

export default function RegisterProperty() {
  const [ownerId, setOwnerId] = useState("");
  const [ulpin, setUlpin] = useState("");
  const [coordinates, setCoordinates] = useState("");
  const [deedFile, setDeedFile] = useState<File | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const registerProperty = async () => {
    // Placeholder for registration logic
    // In real implementation, POST to /api/register-property
    setToast("Property registered successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6">
          Register New Property
        </h1>

        {toast && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {toast}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Owner Hashed ID</label>
              <input
                type="text"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter owner hashed ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">ULPIN</label>
              <input
                type="text"
                value={ulpin}
                onChange={(e) => setUlpin(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter ULPIN"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Coordinates (lat, long or GeoJSON)</label>
              <textarea
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter coordinates"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload Deed PDF</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setDeedFile(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              type="button"
              onClick={registerProperty}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Register Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}