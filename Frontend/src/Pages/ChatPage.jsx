import { useState } from "react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(null);

  return (
    <div className="chat-app">
      <ChatList setActiveChat={setActiveChat} />
      {activeChat ? (
        <ChatWindow conversation={activeChat} />
      ) : (
        <div className="empty-chat">Select a chat</div>
      )}
    </div>
  );
}
