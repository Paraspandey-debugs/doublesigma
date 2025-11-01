"use client";

import { useState } from "react";
import Link from "next/link";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    aadhaar: "",
    state: "",
    district: "",
    village: "",
    role: "citizen",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    // Placeholder for OTP sending
    setOtpSent(true);
    setToast("OTP sent to your mobile number");
    setTimeout(() => setToast(null), 3000);
  };

  const handleRegister = async () => {
    // Placeholder for registration logic
    // In real implementation: hash Aadhaar, validate OTP, create user in MongoDB
    if (formData.password !== formData.confirmPassword) {
      setToast("Passwords do not match");
      return;
    }
    if (!otp) {
      setToast("Please enter OTP");
      return;
    }
    setToast("Registration successful! Please login.");
    setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center py-8">
      <div className="max-w-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-black dark:text-zinc-50 mb-6">
          Register for LandChain
        </h1>

        {toast && (
          <div className="bg-green-500 text-white p-4 rounded mb-4">
            {toast}
          </div>
        )}

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email (Optional)</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Aadhaar Number (Hashed)</label>
            <input
              type="text"
              name="aadhaar"
              value={formData.aadhaar}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter Aadhaar number (will be hashed)"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="State"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="District"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Village/Town</label>
            <input
              type="text"
              name="village"
              value={formData.village}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Village or Town"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="citizen">Citizen / Owner</option>
              <option value="registrar">Registrar</option>
              <option value="admin">Admin (Govt)</option>
              <option value="verifier">Verifier / Surveyor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Create a password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Confirm your password"
            />
          </div>
          {!otpSent ? (
            <button
              type="button"
              onClick={sendOtp}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Send OTP
            </button>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-2">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-4"
                placeholder="Enter 6-digit OTP"
              />
              <button
                type="button"
                onClick={handleRegister}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Register
              </button>
            </div>
          )}
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}