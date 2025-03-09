import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// Store players in each room
const rooms: { [key: string]: string[] } = {};

io.on("connection", (socket) => {
  console.log(`🔗 User connected: ${socket.id}`);

  // Handle joining a room
  socket.on("join-room", (roomId) => {
    if (!rooms[roomId]) rooms[roomId] = []; // Initialize room if it doesn't exist

    // Prevent adding the same player twice
    if (rooms[roomId].includes(socket.id)) {
      socket.emit("already-in-room", { message: "You're already in this room!" });
      return;
    }

    // Limit room to 2 players
    if (rooms[roomId].length >= 2) {
      socket.emit("room-full", { message: "Room is full! Try another room." });
      return;
    }

    // Add player and join the room
    rooms[roomId].push(socket.id);
    socket.join(roomId);
    console.log(`🏠 ${socket.id} joined room: ${roomId}`);

    io.to(roomId).emit("player-joined", { players: rooms[roomId] });

    // If the room has exactly 2 players now, notify the opponent
    if (rooms[roomId].length === 2) {
      const opponentId = rooms[roomId].find((id) => id !== socket.id);
      if (opponentId) {
        io.to(opponentId).emit("opponent-joined", { message: "Your opponent has joined the game!" });
      }
    }
  });

  // Handle a move made by a player
  socket.on("make-move", ({ roomId, index, player }) => {
    io.to(roomId).emit("move-made", { index, player });
  });

  // Handle leaving the room
  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);
    if (rooms[roomId]) {
      rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);

      console.log(`🚪 ${socket.id} left room: ${roomId}`);
      io.to(roomId).emit("player-left", { message: "A player left the game." });

      if (rooms[roomId].length === 0) {
        delete rooms[roomId]; // Cleanup empty rooms
      }
    }
  });

  // Handle restart game
  socket.on("restart-game", (roomId) => {
    io.to(roomId).emit("restart-game");
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);

    for (const roomId in rooms) {
      if (rooms[roomId]?.includes(socket.id)) {
        rooms[roomId] = rooms[roomId].filter((id) => id !== socket.id);
        io.to(roomId).emit("player-left", { message: "A player left the game." });

        if (rooms[roomId].length === 0) {
          delete rooms[roomId]; // Cleanup empty rooms
        }
        break;
      }
    }
  });
});

// Server listening
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
