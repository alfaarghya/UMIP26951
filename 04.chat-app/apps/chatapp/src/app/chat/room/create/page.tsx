"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CreateRoomSchema } from "@chatApp/types/serverTypes";
import api from "../../../../lib/axios";

const CreateRoomPage = () => {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async () => {
    const userId = localStorage.getItem("userId");

    const parsed = CreateRoomSchema.safeParse({ roomName, userId });

    if (!parsed.success) {
      const issues = parsed.error.issues.map(i => i.message).join(", ");
      toast.error(issues);
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/chat/room", parsed.data);

      toast.success("Room created successfully");
      window.dispatchEvent(new Event("room-created"));
      router.push(`/chat/room/${res.data.room.id}`);
    } catch (err: any) {
      if (err.response?.status === 409) {
        toast.error(err.response.data.message || "Room already exists");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a Chat Room</h2>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter a unique room name"
          className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          onClick={handleCreateRoom}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateRoomPage;
