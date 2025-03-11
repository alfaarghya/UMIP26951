"use client";

import { useSearchParams } from "next/navigation";
import Board from "../../../components/Board";
import { use } from "react";

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Unwrap the params using use()
  const searchParams = useSearchParams();
  const playerName = searchParams.get("playerName") || "Anonymous"; // Get player name from URL

  return (
    <Board roomId={id} playerName={playerName} />
  );
}
