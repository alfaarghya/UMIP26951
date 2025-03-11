"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cell from "./Cell";
import { socket } from "../utils/socket";
import { checkWinner } from "../utils/gameLogic";
import ResultDisplay from "./ResultDisplay";
import { BoardProps } from "../types";

export default function Board({ roomId, playerName }: BoardProps) {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [players, setPlayers] = useState<Record<string, string>>({
    X: "",
    O: "",
  }); // Store player names
  const [currentTurn, setCurrentTurn] = useState("X");
  const [result, setResult] = useState<string | null>(null);
  const [opponentMessage, setOpponentMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    socket.emit("join-room", { roomId, playerName });

    socket.on("player-joined", ({ players }) => {
      if (players.length === 2) {
        setPlayers({ X: players[0], O: players[1] }); // Assign names to X and O
      }
    });

    socket.on("move-made", ({ index, player }) => {
      setBoard((prev) => {
        const newBoard = [...prev];
        newBoard[index] = player;
        return newBoard;
      });
    });

    socket.on("turn-change", ({ nextPlayer }) => {
      setCurrentTurn(nextPlayer);
    });

    socket.on("restart-game", () => {
      setBoard(Array(9).fill(""));
      setCurrentTurn("X");
      setResult(null);
    });

    socket.on("player-left", ({ message, playersRemaining }) => {
      setOpponentMessage(message);
      setTimeout(() => setOpponentMessage(null), 3000);

      // If only one player is left, update the players state
      if (playersRemaining.length === 1) {
        setPlayers(() => {
          return { X: playersRemaining[0], O: "" }; // Reset opponent slot
        });
      }

      // If no players are left, redirect to home
      if (playersRemaining.length === 0) {
        router.push("/");
      }
    });

    return () => {
      socket.off("player-joined");
      socket.off("move-made");
      socket.off("turn-change");
      socket.off("restart-game");
      socket.off("player-left");
    };
  }, [roomId, playerName, router]);

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setResult(players[winner] || winner); // Show winner's name
    } else if (board.every((cell) => cell !== "")) {
      setResult("Draw"); // Show draw message when board is full
    }
  }, [board, players]);

  const handleClick = (index: number) => {
    if (board[index] || result) return;
    socket.emit("make-move", { roomId, index, player: currentTurn });
  };

  const handleLeave = () => {
    socket.emit("leave-room", roomId);
    router.push("/");
  };

  const handleRestart = () => {
    socket.emit("restart-game", roomId);
  };

  return (
    <>
      <div className="space-y-2">
        {opponentMessage && <p className="text-green-500 text-center text-xs">{opponentMessage}</p>}
        <ResultDisplay result={result} players={players} currentTurn={currentTurn} />
        <div className="grid grid-cols-3">
          {board.map((value, index) => (
            <Cell key={index} value={value} onClick={() => handleClick(index)} />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center space-x-4 px-4 mb-1">
        <button onClick={handleRestart} className="flex justify-center items-center bg-green-500 text-gray-200 px-4 py-2 rounded-md w-1/2 text-base">
          Restart
          <svg
            className="w-4 h-4 ms-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <path d="M6.677 20.567C2.531 18.021.758 12.758 2.717 8.144C4.875 3.06 10.745.688 15.829 2.846s7.456 8.029 5.298 13.113a9.95 9.95 0 0 1-3.962 4.608"></path>
              <path d="M17 16v4.4a.6.6 0 0 0 .6.6H22m-10 1.01l.01-.011"></path>
            </g>
          </svg>
        </button>
        <button onClick={handleLeave} className="flex justify-center items-center bg-red-400 text-gray-200 px-4 py-2 rounded-md w-1/2 text-base">
          Leave
          <svg className="rtl:rotate-180 w-4 h-4 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path fill="currentColor"
              d="M9.186 2.113a.5.5 0 0 1 .419-.1l7 1.499a.5.5 0 0 1 .394.489v12a.5.5 0 0 1-.395.489l-7 1.5A.5.5 0 0 1 9 17.503v-15a.5.5 0 0 1 .186-.389m3.316 7.888a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0m-4.5-6.998H3.5a.5.5 0 0 0-.5.5v12.995a.5.5 0 0 0 .5.5h4.502z"
            ></path>
          </svg>
        </button>
      </div>
    </>
  );
}
