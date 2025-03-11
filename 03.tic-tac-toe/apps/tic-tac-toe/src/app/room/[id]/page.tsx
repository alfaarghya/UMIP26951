"use client";

import { useSearchParams } from "next/navigation";
import Board from "../../../components/Board";
import { use } from "react";

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrap the params using use()
  const searchParams = useSearchParams();
  const playerName = searchParams.get("playerName") || "Anonymous"; // Get player name from URL

  return (
    <>
      <h2 className="text-xl font-semibold text-center mb-4">Room: {id}</h2>
      <Board roomId={id} playerName={playerName} />
    </>
  );
}
