"use client";

import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const role = typeof window !== "undefined" ? localStorage.getItem("role") || "" : "";

  return (
    <section className="w-full h-full flex flex-col justify-center items-center text-center py-20 bg-gradient-to-b from-blue-500 to-white">
      <div className="m-5">
        <h2 className="text-4xl font-bold text-blue-700 mb-4">Book Appointments Easily</h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          STBA is your all-in-one solution for scheduling and managing academic meetings between students and teachers.
        </p>
      </div>
      <button
        onClick={() => role === "" ? router.push("/login") : router.push("/dashboard")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-md transition duration-300"
      >
        Get Started
      </button>
    </section>
  );
};

export default Hero;