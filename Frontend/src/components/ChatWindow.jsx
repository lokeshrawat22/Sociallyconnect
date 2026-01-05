import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import socket from "../services/socket";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { getUserId } from "../utils/auth";

export default function ChatWindow() {
  const { conversationId } = useParams();
  const userId = getUserId();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typing, setTyping] = useState(false);
  const [chatUser, setChatUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const bottomRef = useRef(null);

  useEffect(() => {
    API.get(`/auth/messages/${conversationId}`).then((res) =>
      setMessages(res.data)
    );

    API.get(`/auth/conversation/id/${conversationId}`).then((res) => {
      const other = res.data.members.find((m) => m._id !== userId);
      setChatUser(other);
    });

    socket.emit("joinRoom", conversationId);

    socket.on("receiveMessage", (msg) =>
      setMessages((prev) => [...prev, msg])
    );

    socket.on("typing", () => setTyping(true));
    socket.on("stopTyping", () => setTyping(false));

    socket.on("userOnline", (id) =>
      setOnlineUsers((prev) => [...new Set([...prev, id])])
    );

    socket.on("userOffline", (id) =>
      setOnlineUsers((prev) => prev.filter((u) => u !== id))
    );

    return () => {
      socket.emit("leaveRoom", conversationId);
      socket.off();
    };
  }, [conversationId, userId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim()) return;

    socket.emit("sendMessage", {
      conversationId,
      text,
    });

    socket.emit("stopTyping", { roomId: conversationId });
    setText("");
  };

  const isOnline = chatUser && onlineUsers.includes(chatUser._id);

  return (
    <div className="flex flex-col h-full bg-gray-50">

      {/* HEADER */}
      <div className="flex items-center gap-3 px-4 py-3 border-b bg-white">
        <button
          onClick={() => navigate("/messages")}
          className="md:hidden text-gray-500 text-lg"
        >
          ←
        </button>

        {chatUser && (
          <>
            <img
              src={
                chatUser.profilePic
                  || "/default-avatar.png"
              }
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="font-semibold text-gray-900">
                {chatUser.username}
              </p>
              <p className={`text-xs ${isOnline ? "text-green-600" : "text-gray-400"}`}>
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </>
        )}
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-w-3xl mx-auto w-full">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} msg={msg} />
        ))}
        {typing && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="flex items-center gap-3 px-4 py-3 border-t bg-white">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            socket.emit("typing", { roomId: conversationId });
          }}
          placeholder="Type a message..."
          className="flex-1 rounded-full border px-4 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-[#FF6B5E]"
        />

        <button
          onClick={sendMessage}
          className="bg-[#FF6B5E] hover:bg-[#E85A4F] text-white
                     px-5 py-2 rounded-full text-sm font-medium transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
