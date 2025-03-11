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

// Store players in each room as { socketId: playerName }
const rooms: { 
  [key: string]: { 
    players: { [socketId: string]: string };
    turn: string;
  } 
} = {};

io.on("connection", (socket) => {
  console.log(`🔗 User connected: ${socket.id}`);

  // Handle joining a room with name
  socket.on("join-room", ({ roomId, playerName }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = { players: {}, turn: "X" }; // Initialize room if it doesn't exist
    }

    // Prevent adding the same player twice
    if (rooms[roomId].players[socket.id]) {
      socket.emit("already-in-room", { message: "You're already in this room!" });
      return;
    }

    // Limit room to 2 players
    if (Object.keys(rooms[roomId].players).length >= 2) {
      socket.emit("room-full", { message: "Room is full! Try another room." });
      return;
    }

    // Add player with name and join the room
    rooms[roomId].players[socket.id] = playerName;
    socket.join(roomId);
    console.log(`🏠 ${playerName} (${socket.id}) joined room: ${roomId}`);

    // Notify all players in the room
    io.to(roomId).emit("player-joined", { 
      players: Object.values(rooms[roomId].players) 
    });

    // If two players have joined, notify them
    if (Object.keys(rooms[roomId].players).length === 2) {
      io.to(roomId).emit("game-start", { 
        message: `Game started! ${rooms[roomId].players[socket.id]} (X) goes first.`,
        turn: "X"
      });
    }
  });

  // Handle a move made by a player
  socket.on("make-move", ({ roomId, index, player }) => {
    if (!rooms[roomId]) return;

    const playerName = rooms[roomId].players[socket.id];
    io.to(roomId).emit("move-made", { index, player, playerName });

    // Switch turn and notify players
    rooms[roomId].turn = player === "X" ? "O" : "X";
    io.to(roomId).emit("turn-change", { 
      nextPlayer: rooms[roomId].turn 
    });
  });

 // Handle leaving the room
  const removePlayerFromRoom = (socketId: string, roomId: string) => {
    if (rooms[roomId]) {
      const playerName = rooms[roomId].players[socketId];
      delete rooms[roomId].players[socketId];

      console.log(`🚪 ${socketId} (${playerName}) left room: ${roomId}`);
      io.to(roomId).emit("player-left", { message: `${playerName} left the game.` });

      // If the room is empty, delete it
      if (Object.keys(rooms[roomId].players).length === 0) {
        console.log(`🗑️ Room ${roomId} deleted.`);
        delete rooms[roomId];
      } else {
        // Assign the turn to the remaining player
        rooms[roomId].turn = "X"; // Reset to X
        io.to(roomId).emit("turn-change", { nextPlayer: rooms[roomId].turn });
      }
    }
  };

  // Handle leaving the room
  socket.on("leave-room", (roomId) => {  
    removePlayerFromRoom(socket.id, roomId);
    socket.leave(roomId);
  });

  // Handle restart game
  socket.on("restart-game", (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].turn = "X"; // Reset turn to X
      io.to(roomId).emit("restart-game", { message: "Game restarted!", turn: "X" });
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
  console.log(`❌ User disconnected: ${socket.id}`);

     for (const roomId in rooms) {
      const room = rooms[roomId]; // Store the room object
      if (room && room.players && room.players[socket.id]) {
        removePlayerFromRoom(socket.id, roomId);
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
