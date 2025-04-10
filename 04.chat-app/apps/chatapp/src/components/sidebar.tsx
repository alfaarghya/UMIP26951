"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import 'remixicon/fonts/remixicon.css'
import api from "../lib/axios";
import { useRouter } from "next/navigation";

interface ChatRoom {
  id: string;
  name: string;
  createdAt: string;
}

interface InboxUser {
  id: string;
  username: string;
}

const Sidebar = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [inbox, setInbox] = useState<InboxUser[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const res = await api.get("/chat/lists");
      const { chatRooms, inbox } = res.data;
      setChatRooms(chatRooms || []);
      setInbox(inbox || []);
    } catch (error) {
      console.error("Failed to fetch chat lists:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();

    const handleRoomUpdate = () => {
      fetchChats();
    };

    window.addEventListener("room-created", handleRoomUpdate);
    window.addEventListener("room-joined", handleRoomUpdate);

    return () => {
      window.removeEventListener("room-created", handleRoomUpdate);
      window.removeEventListener("room-joined", handleRoomUpdate);
    };

  }, []);

  return (
    <aside className="w-64 bg-gray-900 text-white p-4 space-y-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Chats</h2>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/chat/room/create")}
            className="p-1 rounded hover:bg-gray-700 transition"
            title="Create new room"
          >
            <i className="ri-add-circle-line text-xl" />
          </button>
          <button
            onClick={() => router.push("/chat/room/join")}
            className="p-1 rounded hover:bg-gray-700 transition"
            title="Join room"
          >
            <i className="ri-login-box-line text-xl" />
          </button>
          <button
            onClick={fetchChats}
            className="p-1 rounded hover:bg-gray-700 transition"
            title="Refresh chat list"
          >
            <i className={`ri-restart-line text-lg ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {chatRooms.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Rooms</h3>
          <ul className="space-y-2">
            {chatRooms.map((room) => (
              <li key={room.id}>
                <Link
                  href={`/chat/room/${room.id}`}
                  className="block px-3 py-2 rounded hover:bg-gray-700 transition"
                >
                  {room.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {inbox.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Direct Messages</h3>
          <ul className="space-y-2">
            {inbox.map((dm) => (
              <li key={dm.id}>
                <Link
                  href={`/chat/dm/${dm.id}`}
                  className="block px-3 py-2 rounded hover:bg-gray-700 transition"
                >
                  {dm.username}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {chatRooms.length === 0 && inbox.length === 0 && !loading && (
        <div className="text-gray-400 text-sm">No chats yet. Start a conversation!</div>
      )}
    </aside>
  );
};

export default Sidebar;
