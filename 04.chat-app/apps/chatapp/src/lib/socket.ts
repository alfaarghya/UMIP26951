// /src/lib/socket.ts
import { useEffect, useRef, useCallback } from "react";

type MessageType = "room" | "direct";

interface WebSocketOptions {
  chatId: string;
  type: MessageType;
  userId?: string;
  onMessage: (data: any) => void;
}

export const useWebSocket = ({ chatId, type, userId, onMessage }: WebSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const SOCKET_URL = "ws://localhost:8080";
    const socket = new WebSocket(SOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket Connected");

      // Join logic (only for roomMessage type)
      if (userId && type === "room") {
        socket.send(
          JSON.stringify({
            type: "joinRoom",
            roomId: chatId,
            senderId: userId,
          })
        );
      }
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("❌ Invalid message format", err);
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket Disconnected");
    };

    socket.onerror = (err) => {
      console.error("⚠️ WebSocket Error:", err);
    };
  }, [chatId, type, userId, onMessage]);

  const sendMessage = (data: object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    } else {
      console.warn("🚫 WebSocket not open yet");
    }
  };

  useEffect(() => {
    connect();

    return () => {
      socketRef.current?.close();
    };
  }, [connect]);

  return { sendMessage };
};
