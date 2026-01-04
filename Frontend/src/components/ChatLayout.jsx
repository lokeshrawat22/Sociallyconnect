import { Outlet, useLocation } from "react-router-dom";
import ChatList from "./ChatList";

const ChatLayout = () => {
  const location = useLocation();
  const isChatOpen = location.pathname !== "/messages";

  return (
    <div className="flex h-[calc(100vh-140px)] bg-gray-100">
      {/* CHAT LIST */}
      <div
        className={`${
          isChatOpen ? "hidden md:flex" : "flex"
        } w-full md:w-[320px] border-r bg-white`}
      >
        <ChatList />
      </div>

      {/* CHAT WINDOW */}
      <div
        className={`${
          isChatOpen ? "flex" : "hidden md:flex"
        } flex-1 flex flex-col bg-gray-50`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
