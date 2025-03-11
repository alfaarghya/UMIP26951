"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cell from "./Cell";
import { socket } from "../utils/socket";
import { checkWinner } from "../utils/gameLogic";
import ResultDisplay from "./ResultDisplay";

interface BoardProps {
  roomId: string;
  playerName: string;
}

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
        setPlayers((prev) => {
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
    <div className="space-y-4">
      {opponentMessage && <p className="text-green-500 text-center">{opponentMessage}</p>}
      {/* <p className="text-center text-lg font-bold">
        {result ? (result === "Draw" ? "It's a Draw!" : `Winner: ${result}`) : `Current Turn: ${players[currentTurn] || "Waiting for players..."}`}
      </p> */}
      <ResultDisplay result={result} players={players} currentTurn={currentTurn} />
      <div className="grid grid-cols-3">
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
