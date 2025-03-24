import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { parse } from "cookie";
import prisma from "@chatApp/db/prisma";
// import { encryptMessage } from "@chatApp/utils";

interface ExtendedWebSocket extends WebSocket {
  userId?: string;
}

const socketHandler = (wss: WebSocketServer) => {
  wss.on("connection", async (ws: ExtendedWebSocket, req) => {
    try {
      //  Authenticate User via JWT from cookies
      const cookies = parse(req.headers.cookie || "");
      const token = cookies?.authToken;
      if (!token) {
        console.log("❌ No token found, closing connection.");
        ws.close();
        return;
      }

      // eslint-disable-next-line turbo/no-undeclared-env-vars
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
      const userId = decoded?.userId;
      if (!decoded || !userId) {
        console.log("❌ Invalid token, closing connection.");
        ws.close();
        return;
      }

      ws.userId = decoded.userId; // Store userId in ws connection
      console.log(`🔗 User ${ws.userId} connected`);

      // Handle incoming messages
      ws.on("message", async (data) => {
        try {
          const { type, content, roomId, recipientId } = JSON.parse(data.toString());

          if (!content) {
            console.log("❌ No content found.");
            return;
          }

          // Handling Room Messages
          if (type === "roomMessage") {
            if (!roomId) {
              console.log("❌ No roomId found.");
              return;
            }

            // Check if user is in the room
            const userInRoom = await prisma.userChatRoom.findUnique({
              where: { userId_roomId: { userId, roomId } },
            });

            if (!userInRoom) {
              ws.send(JSON.stringify({ error: "You are not part of this room." }));
              return;
            }


            // // Encrypt message before storing
            // const encryptedContent = encryptMessage(content);

            // Store message in DB
            const message = await prisma.message.create({
              data: {
                content: content,
                senderId: userId!,
                roomId,
              },
            });

            // Broadcast to all users in the room
            wss.clients.forEach(client => {
              if (client.readyState === WebSocket.OPEN && (client as ExtendedWebSocket).userId !== ws.userId) {
                client.send(
                  JSON.stringify({
                    type: "roomMessage",
                    roomId,
                    senderId: ws.userId,
                    content,
                    createdAt: message.createdAt,
                  })
                );
              }
            });
          }

          // Handling Direct Messages
          else if (type === "directMessage") {
            if (!recipientId) {
              console.log("❌ No recipientId found.");
              return;
            }

            // // Encrypt message before storing
            // const encryptedContent = encryptMessage(content);

            // Store message in DB
            const message = await prisma.message.create({
              data: {
                content: content,
                senderId: ws.userId!,
                receiverId: recipientId,
              },
            });

            // Send message to recipient if online
            wss.clients.forEach(client => {
              if ((client as ExtendedWebSocket).userId === recipientId && client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    type: "directMessage",
                    senderId: ws.userId,
                    recipientId,
                    content,
                    createdAt: message.createdAt,
                  })
                );
              }
            });
          }
        } catch (err) {
          console.error("Error handling message:", err);
        }
      });

      // Handle disconnection
      ws.on("close", () => {
        console.log(`❌ User ${ws.userId} disconnected`);
      });

    } catch (err) {
      console.error("Error in WebSocket connection:", err);
      ws.close();
    }
  });
};

export default socketHandler;
