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

app.use(cors()); //handle CORS errors

io.on("connection", (socket) => {
  console.log(`🔗 User connected: ${socket.id}`);

  // handle join in room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`🏠 ${socket.id} joined room: ${roomId}`);
  });

  // handle a move made by a player
  socket.on("make-move", ({ roomId, index, player }) => {
    io.to(roomId).emit("move-made", { index, player });
  });

  // handle user disconnection
  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

//server listening
const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
