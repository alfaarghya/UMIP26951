// import dbConnect from "./dbConnect";
import { wss } from "../app";
import socketHandler from "./socketHandler";

const startServer = async (port: number) => {
  try {
    console.log("🚀 Starting server...");
    // await dbConnect(); // Connect to database
    socketHandler(wss); // Initialize WebSocket events
    console.log(`✅ Server is running on http://localhost:${port} ⚙️`);
  } catch (err) {
    console.log("❌ Error while starting server: " + err);
  }
};

export default startServer;
