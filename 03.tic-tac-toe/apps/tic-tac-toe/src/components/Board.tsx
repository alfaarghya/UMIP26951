"use client";

import { useState, useEffect } from "react";
import ResultDisplay from "./ResultDisplay";
import Cell from "./Cell";
import { socket } from "../utils/socket";
import { checkWinner } from "../utils/gameLogic";
import { useRouter } from "next/navigation";

interface BoardProps {
  roomId: string;
}

export default function Board({ roomId }: BoardProps) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const [opponentMessage, setOpponentMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("move-made", ({ index, player }) => {
      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[index] = player;
        return newBoard;
      });
      setIsXNext((prev) => !prev);
    });

    socket.on("opponent-joined", ({ message }) => {
      setOpponentMessage(message);
      setTimeout(() => setOpponentMessage(null), 3000); // Hide message after 3 seconds
    });

    socket.on("restart-game", () => {
      setBoard(Array(9).fill(""));
      setIsXNext(true);
      setResult(null);
    });

    socket.on("player-left", ({ message }) => {
      setOpponentMessage(message);
      setTimeout(() => setOpponentMessage(null), 3000);
    });

    return () => {
      socket.off("move-made");
      socket.off("opponent-joined");
      socket.off("restart-game");
      socket.off("player-left");
    };
  }, [roomId]);

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) setResult(winner);
  }, [board]);

  const handleClick = (index: number) => {
    if (board[index] || result) return;
    const player = isXNext ? "X" : "O";
    socket.emit("make-move", { roomId, index, player });
  };

  const handleLeave = () => {
    socket.emit("leave-room", roomId);
    router.push("/");
  };

  const handleRestart = () => {
    socket.emit("restart-game", roomId);
  };

  return (
    <div className="space-y-4">
      {opponentMessage && <p className="text-green-500 text-center">{opponentMessage}</p>}
      <ResultDisplay result={result} isXNext={isXNext} />
      <div className="grid grid-cols-3 ">
        {board.map((value, index) => (
          <Cell key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <div className="w-full flex justify-center space-x-4">
        <button onClick={handleRestart} className="bg-yellow-500 text-white px-4 py-2 rounded-md w-1/2">
          Restart
        </button>
        <button onClick={handleLeave} className="bg-red-500 text-white px-4 py-2 rounded-md w-1/2">
          Leave
        </button>
      </div>
    </div>
  );
}
