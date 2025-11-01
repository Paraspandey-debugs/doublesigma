"use client";

import { useState } from "react";

export default function Header() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    // Placeholder for wallet connection
    // In real implementation, use ethers.js or web3
    setWalletAddress("0x1234...abcd"); // Mock address
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">LandChain Portal</h1>
        <div className="flex items-center gap-4">
          {walletAddress ? (
            <span>Connected: {walletAddress}</span>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Connect Wallet
            </button>
          )}
          <nav className="flex gap-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/user/dashboard" className="hover:underline">User Dashboard</a>
            <a href="/admin/dashboard" className="hover:underline">Admin Dashboard</a>
          </nav>
        </div>
      </div>
    </header>
  );
}