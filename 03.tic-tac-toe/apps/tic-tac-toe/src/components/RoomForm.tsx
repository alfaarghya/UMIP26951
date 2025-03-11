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
      setError("enter both Room & Your Name");
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
    < >
      <form onSubmit={handleJoin} className="flex flex-col items-center space-y-4 mb-5">
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm  border-e-0 rounded-s-md bg-gray-600 text-gray-400 border-gray-600">
            <svg
              className="w-4 h-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 576"
              width="1em"
              height="1em"
            >
              <path
                fill="currentColor"
                d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c.2 35.5-28.5 64.3-64 64.3H128.1c-35.3 0-64-28.7-64-64V287.7h-32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7l255.4 224.5c8 7 12 15 11 24M352 224a64 64 0 1 0-128 0a64 64 0 1 0 128 0m-96 96c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16h192c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80z"
              ></path>
            </svg>
          </span>
          <input type="text" placeholder="Enter Room Name"
            value={roomCode} onChange={(e) => setRoomCode(e.target.value)} className="rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="flex">
          <span className="inline-flex items-center px-3 text-sm  border-e-0 rounded-s-md bg-gray-600 text-gray-400 border-gray-600">
            <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
          </span>
          <input type="text" placeholder="Enter your name" value={playerName} onChange={(e) => setPlayerName(e.target.value)} className="rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-2.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button type="submit" className="cursor-pointer focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 ">
          Join Room
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
          </svg>
        </button>
      </form>
      <div id="alert" className="" >
        {error ? <div className=" w-full flex items-center justify-between p-3 rounded-lg bg-gray-700 text-red-400" role="alert" >
          <svg className="shrink-0 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="m-1 text-[11px]">
            {error}
          </div>

        </div>
          : <div className=" w-full flex items-center justify-between p-4 rounded-lg  text-gray-800" role="alert" >
            <div className="ms-3 text-[11px]">
              what should I do?
            </div>
          </div>}
      </div>
    </>
  );
};

export default RoomForm;
