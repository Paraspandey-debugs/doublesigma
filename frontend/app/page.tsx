import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
            Blockchain-Based Land and Property Record Management System
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Secure land records with blockchain technology
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
