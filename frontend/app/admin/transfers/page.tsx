"use client";

import { useState } from "react";
import Header from "../../components/Header";

interface TransferRequest {
  id: string;
  ulpin: string;
  oldOwner: string;
  newOwner: string;
  docHash: string;
}

export default function TransferApprovals() {
  const [transfers, setTransfers] = useState<TransferRequest[]>([
    { id: "1", ulpin: "ULPIN123", oldOwner: "0x1111", newOwner: "0x2222", docHash: "hash123" },
    { id: "2", ulpin: "ULPIN456", oldOwner: "0x3333", newOwner: "0x4444", docHash: "hash456" },
  ]);
  const [toast, setToast] = useState<string | null>(null);

  const approveTransfer = async (id: string) => {
    // Placeholder for approval logic
    // In real implementation, trigger smart contract transaction
    setTransfers(transfers.filter(t => t.id !== id));
    setToast("Transfer approved successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-50 mb-6">
          Approve Ownership Transfers
        </h1>

        {toast && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {toast}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Pending Transfer Requests</h2>
          {transfers.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No pending transfers.</p>
          ) : (
            <div className="space-y-4">
              {transfers.map((transfer) => (
                <div key={transfer.id} className="border border-gray-300 dark:border-gray-600 rounded p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <strong>ULPIN:</strong> {transfer.ulpin}
                    </div>
                    <div>
                      <strong>Old Owner:</strong> {transfer.oldOwner}
                    </div>
                    <div>
                      <strong>New Owner:</strong> {transfer.newOwner}
                    </div>
                    <div>
                      <strong>Doc Hash:</strong> {transfer.docHash}
                    </div>
                  </div>
                  <button
                    onClick={() => approveTransfer(transfer.id)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Approve Transfer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}