import { useState, useRef, useEffect } from "react";
import socket from "../services/socket";
import { getUserId } from "../utils/auth";

export default function MessageBubble({ msg }) {
  const userId = getUserId();
  const isMe = msg.sender._id === userId;

  const [showMenu, setShowMenu] = useState(false);
  const bubbleRef = useRef(null);

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    const close = (e) => {
      if (bubbleRef.current && !bubbleRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div ref={bubbleRef} className="relative max-w-[75%]">

        <div
          onDoubleClick={() => setShowMenu(true)}
          className={`px-4 py-2 rounded-2xl text-sm shadow
            ${isMe
              ? "bg-[#FF6B5E] text-white rounded-br-sm"
              : "bg-white text-gray-900 rounded-bl-sm"
            }`}
        >
          {msg.deletedForEveryone ? (
            <span className="italic opacity-70">Message deleted</span>
          ) : (
            msg.text
          )}

          <div className="flex justify-end gap-1 mt-1 text-[10px] opacity-70">
            <span>{formatTime(msg.createdAt)}</span>
            {isMe && msg.seen && <span>✓✓</span>}
          </div>
        </div>

        {showMenu && isMe && !msg.deletedForEveryone && (
          <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg text-sm z-20">
            <button
              onClick={() => {
                const newText = prompt("Edit message", msg.text);
                if (newText) {
                  socket.emit("editMessage", {
                    messageId: msg._id,
                    newText,
                  });
                }
                setShowMenu(false);
              }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={() => {
                socket.emit("deleteMessageForEveryone", {
                  messageId: msg._id,
                });
                setShowMenu(false);
              }}
              className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
