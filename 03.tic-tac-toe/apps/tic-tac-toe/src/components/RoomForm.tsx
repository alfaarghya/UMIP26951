"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "../utils/socket";

const RoomForm = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error
    if (!roomCode.trim()) return;

    socket.emit("join-room", roomCode);
    socket.on("room-full", (data) => {
      setError(data.message); // Show error if room is full
    });

    socket.on("player-joined", () => {
      router.push(`/room/${roomCode}`); // Navigate to room if joined
    });
  };

  return (
    <form onSubmit={handleJoin} className="flex flex-col items-center space-y-4">
      <input
        type="text"
        placeholder="Enter Room Code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        className="p-2 border rounded-md w-64"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Join Room
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default RoomForm;
