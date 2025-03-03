"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const RoomForm = () => {
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomCode.trim()) router.push(`/room/${roomCode}`);
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
    </form>
  );
}

export default RoomForm;