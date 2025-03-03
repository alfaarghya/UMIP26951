"use client";

import { useState, useEffect } from "react";
import ResultDisplay from "./ResultDisplay";
import Cell from "./Cell";
import { socket } from "../utils/socket";
import { checkWinner } from "../utils/gameLogic";

interface BoardProps {
  roomId: string;
}

export default function Board({ roomId }: BoardProps) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [result, setResult] = useState<string | null>(null);

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

    return () => {
      socket.off("move-made");
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

  return (
    <div className="space-y-4">
      <ResultDisplay result={result} isXNext={isXNext} />
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <Cell key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>
      <button
        onClick={() => { setBoard(Array(9).fill("")); setResult(null); setIsXNext(true); }}
        className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Restart Game
      </button>

    </div>
  );
}
