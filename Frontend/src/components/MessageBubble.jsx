import { useState, useRef, useEffect } from "react";
import socket from "../services/socket";
import { getUserId } from "../utils/auth";

export default function MessageBubble({ msg }) {
  const userId = getUserId();
  const isMe = msg.sender._id === userId;

  const [showMenu, setShowMenu] = useState(false);
  const bubbleRef = useRef(null);

  const editMessage = () => {
    const newText = prompt("Edit message", msg.text);
    if (newText) {
      socket.emit("editMessage", {
        messageId: msg._id,
        newText,
      });
    }
    setShowMenu(false);
  };

  const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
};

  const deleteMessage = () => {
    socket.emit("deleteMessageForEveryone", { messageId: msg._id });
    setShowMenu(false);
  };

  /* Close menu on outside click */
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
      <div ref={bubbleRef} className="relative max-w-[75%] ">
        {/* MESSAGE */}
        <div
          onDoubleClick={() => setShowMenu(true)}
          className={`group px-1 py-2 rounded-2xl text-sm shadow flex gap-2
            ${
              isMe
                ? "bg-green-500 text-white rounded-br-sm"
                : "bg-white text-gray-900 rounded-bl-sm"
            }`}
        >
          {msg.deletedForEveryone ? (
            <span className="italic opacity-70">Message deleted</span>
          ) : (
            msg.text
          )}

          {msg.edited && (
            <span className="ml-2 text-[10px] opacity-60">edited</span>
          )}

         {isMe && (
  <div className="flex justify-end items-center gap-1 mt-1 opacity-70">
    <span className="text-[10px]">
      {formatTime(msg.createdAt)}
    </span>

    {msg.seen && (
      <span className="text-[10px] text-blue-900 gap-1">
        ✓✓
      </span>
    )}
  </div>
)}

        </div>

        {/* 3 DOT MENU BUTTON */}
        {isMe && !msg.deletedForEveryone && (
          <button
            onClick={() => setShowMenu((p) => !p)}
            className="absolute top-1.5 right-0 rounded shadow
                       w-4 h-6  flex items-center justify-center
                      text-white"
          >
            ⋮
          </button>
        )}


        {/* MENU */}
        {showMenu && isMe && !msg.deletedForEveryone && (
          <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg overflow-hidden text-sm z-20">
            <button
              onClick={editMessage}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              onClick={deleteMessage}
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
