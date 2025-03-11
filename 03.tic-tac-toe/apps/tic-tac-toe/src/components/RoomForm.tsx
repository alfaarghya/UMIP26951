"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { socket } from "../utils/socket";

const RoomForm = () => {
  const [roomCode, setRoomCode] = useState("");
  const [playerName, setPlayerName] = useState(""); // New: Store player's name
  const [error, setError] = useState("");
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!roomCode.trim() || !playerName.trim()) {
      setError("Please enter both Room Code and your Name.");
      return;
    }

    socket.emit("join-room", { roomCode, playerName });

    socket.on("room-full", (data) => {
      setError(data.message);
    });

    socket.on("player-joined", () => {
      router.push(`/room/${roomCode}?playerName=${encodeURIComponent(playerName)}`);
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
      <input
        type="text"
        placeholder="Enter Your Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
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
