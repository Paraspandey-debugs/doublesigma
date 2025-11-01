"use client";

import { useState } from "react";
import Header from "../../components/Header";

export default function UserDashboard() {
  const [ulpin, setUlpin] = useState("");
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [transferUlpin, setTransferUlpin] = useState("");
  const [newOwnerId, setNewOwnerId] = useState("");
  const [deedFile, setDeedFile] = useState<File | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const verifyProperty = async () => {
    // Placeholder for verification logic
    // In real implementation, call backend API
    setVerificationResult(`Property verified for ULPIN: ${ulpin}. Owner: 0x1234...`);
    setToast("Property verified successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  const requestTransfer = async () => {
    // Placeholder for transfer request
    // In real implementation, POST to /api/transfer-request
    setToast("Transfer request submitted!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6">
          Property Verification Portal
        </h1>

        {toast && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {toast}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Verify Property</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter ULPIN"
              value={ulpin}
              onChange={(e) => setUlpin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={verifyProperty}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Verify Property
            </button>
            {verificationResult && (
              <p className="text-green-600 dark:text-green-400">{verificationResult}</p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Request Ownership Transfer</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="ULPIN"
              value={transferUlpin}
              onChange={(e) => setTransferUlpin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="text"
              placeholder="New Owner ID"
              value={newOwnerId}
              onChange={(e) => setNewOwnerId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setDeedFile(e.target.files?.[0] || null)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={requestTransfer}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Submit Transfer Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}