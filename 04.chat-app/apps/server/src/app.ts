import express from "express";
import { createServer } from "http";
import WebSocket from "ws";
import cors from "cors";
import cookieParser from "cookie-parser";
import checkRoutes from "./middleware/checkRoutes";
import auth from "./routes/auth.route";
import chat from "./routes/chat.route";
import search from "./routes/search.route";

const app = express();
const server = createServer(app); // Create HTTP server
const wss = new WebSocket.Server({ server }); // Create WebSocket Server

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); //parse the cookies
app.use(checkRoutes); // check all routes 

//api routes
app.use("/api/auth", auth);
app.use("/api/chat", chat);
app.use("/api/search", search)

// Default Route
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello from chat-app server" });
});

// Export both `app` and `server`
export { app, server, wss };
