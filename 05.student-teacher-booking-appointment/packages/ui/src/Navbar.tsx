'use client'

import Link from 'next/link'
import { useRouter } from "next/navigation";
import { NavBarProps } from "@stba/types/client"
import { toast } from 'sonner';
import { useUser } from './context/UserContext';
import api from '@stba/utils/api';

const Navbar = ({ className, appName }: NavBarProps) => {
  const router = useRouter();
  const { name, setName } = useUser();

  //logout
  const logout = async () => {
    try {
      const res = await api.post("/auth/logout");
      localStorage.removeItem('name');
      localStorage.removeItem('role');
      toast.success(res.data.message || 'Logged out successfully');
      setName('');
      router.push('/login');
    } catch (err: any) {
      toast.error("can't logout")
    }

  };

  return (
    <nav className="w-full px-6 py-4 bg-gray-800 shadow-md flex justify-between items-center fixed">
      <div>
        <Link href="/" className="">
          <h1 className="text-4xl font-bold text-blue-500">STBA</h1>
          <p className={`text-sm text-center ${className}`}>{appName}</p>
        </Link>
      </div>
      <div>
        {name === "" ? (
          <Link href="/login">
            <button className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-lg text-black  transition">
              Log In
            </button>
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <span className="text-gray-200">Hello, {name}</span>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg text-lg transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
