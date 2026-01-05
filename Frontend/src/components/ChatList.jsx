import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";
import socket from "../services/socket";
import { getUserId } from "../utils/auth";

export default function ChatList() {
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = getUserId();

  useEffect(() => {
    API.get("/auth/chats").then((res) => setChats(res.data));

    socket.on("userOnline", (id) =>
      setOnlineUsers((prev) => [...new Set([...prev, id])])
    );

    socket.on("userOffline", (id) =>
      setOnlineUsers((prev) => prev.filter((u) => u !== id))
    );

    return () => socket.off();
  }, []);

  return (
    <div className="w-full md:w-[340px] bg-white border-r flex flex-col mt-9 ">

      {/* HEADER */}
      <div className="px-5   font-semibold text-gray-800 border-b justify-center flex items-center">
         <span className="text-lg font-semibold text-blue-950">
               
                Socially <span className="text-cyan-500">Connect</span>
              </span> <span className="opacity-50">- messages</span>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((c) => {
          const other = c.members.find((m) => m._id !== userId);
          const online = onlineUsers.includes(other._id);
          const active = location.pathname.includes(c._id);

          return (
            <div
              key={c._id}
              onClick={() => navigate(`/messages/${c._id}`)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition
                ${
                  active
                    ? "bg-[#FFF1EE] border-r-4 border-[#FF6B5E]"
                    : "hover:bg-gray-50"
                }`}
            >
              <div className="relative">
                <img
                  src={
                    other.profilePic
                    ||
                       "/default-avatar.png"
                  }
                  className="w-11 h-11 rounded-full object-cover"
                />
                {online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {other.username}
                </span>
                <span className="text-xs text-gray-400">
                  {online ? "Online" : "Offline"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
