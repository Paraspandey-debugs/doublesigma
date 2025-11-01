"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [useWallet, setUseWallet] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleLogin = async () => {
    // Placeholder for login logic
    // In real implementation, validate credentials and generate JWT
    if (mobile && password) {
      setToast("Login successful! Redirecting...");
      // Simulate redirect
      setTimeout(() => {
        window.location.href = "/user/dashboard"; // Default to user dashboard
      }, 2000);
    } else {
      setToast("Please enter mobile and password");
    }
    setTimeout(() => setToast(null), 3000);
  };

  const handleWalletLogin = async () => {
    // Placeholder for wallet login
    // In real implementation, connect to MetaMask and verify
    setToast("Wallet connected! Logging in...");
    setTimeout(() => {
      window.location.href = "/admin/dashboard"; // Default to admin for wallet users
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-black dark:text-zinc-50 mb-6">
          Login to LandChain
        </h1>

        {toast && (
          <div className="bg-blue-500 text-white p-4 rounded mb-4">
            {toast}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Mobile Number</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">Or</p>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={useWallet}
                onChange={(e) => setUseWallet(e.target.checked)}
                className="mr-2"
              />
              Use Wallet Login (MetaMask)
            </label>
            {useWallet && (
              <button
                onClick={handleWalletLogin}
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}