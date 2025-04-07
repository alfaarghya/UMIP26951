"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUsername } from "../hooks/useUsername";

const Navbar = () => {
  const { username, logout } = useUsername();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/signin");
  };

  return (
    <nav className="bg-gray-800 text-white p-5 flex justify-between items-center shadow-lg fixed w-full top-0 z-50">
      <Link href="/" className="text-2xl font-bold">ChatApp</Link>
      <div>
        {username ? (
          <div className="flex items-center gap-4">
            <span className="text-gray-200">Hello, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-lg transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link href="/signin">
            <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg text-lg transition duration-300">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
