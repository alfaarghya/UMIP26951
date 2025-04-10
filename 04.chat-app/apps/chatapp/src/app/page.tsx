"use client";

import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const username = typeof window !== "undefined" ? localStorage.getItem("username") || "" : "";

  return (
    <section className="text-center py-24 px-6">
      <h2 className="text-5xl font-bold mb-6 text-gray-800 leading-tight">Welcome to ChatApp</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Seamless communication for everyone. Join rooms, chat securely, and stay connected.
      </p>
      <button
        onClick={() => username === "" ? router.push("/signin") : router.push("/chat")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-md transition duration-300"
      >
        Get Started
      </button>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        <FeatureCard title="Real-time Chat" description="Connect instantly with friends and colleagues." />
        <FeatureCard title="Secure & Private" description="End-to-end encryption keeps your messages safe." />
        <FeatureCard title="Easy to Use" description="Simple interface for a smooth chatting experience." />
      </div>
    </section>
  );
};

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="p-8 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <h3 className="text-2xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home;
