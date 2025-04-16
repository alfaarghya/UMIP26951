'use client'

import Link from 'next/link'
import { NavBarProps } from "@stba/types/client"

const Navbar = ({ className, appName }: NavBarProps) => {
  return (
    <nav className="w-full px-6 py-4 bg-gray-800 shadow-md flex justify-between items-center fixed">
      <div>
        <h1 className="text-4xl font-bold text-blue-500">STBA</h1>
        <p className={`text-sm text-center ${className}`}>{appName}</p>
      </div>
      <Link href="/signin">
        <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg text-black  transition">
          Sign In
        </button>
      </Link>
    </nav>
  );
};

export default Navbar;
