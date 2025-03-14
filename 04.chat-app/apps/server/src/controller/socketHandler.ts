import { Server } from "socket.io";

const socketHandler = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`✅ New user connected: ${socket.id}`);

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on("chatMessage", ({ room, message, user }) => {
      console.log(`📩 Message from ${user}: "${message}" in room "${room}"`);
      io.to(room).emit("chatMessage", { user, message });
    });

    socket.on("disconnect", () => {
      console.log(`❌ User ${socket.id} disconnected`);
    });
  });
};

export default socketHandler;
