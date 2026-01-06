import { Outlet, useLocation } from "react-router-dom";
import ChatList from "./ChatList";
import navlogo from '../assets/navlogo.png'
const ChatLayout = () => {
  const location = useLocation();
  const isChatOpen = location.pathname !== "/messages";

  return (
    <div className="flex h-[75vh] bg-gray-50 overflow-hidden ">


      {/* LEFT: CHAT LIST */}
      <div
        className={`
          ${isChatOpen ? "hidden md:flex" : "flex"}
          w-full md:w-85
          bg-white border-r
        `}
      >
        <ChatList />
      </div>

      {/* RIGHT: CHAT WINDOW */}
      <div
        className={`
          ${isChatOpen ? "flex" : "hidden md:flex z-0"}
          flex-1 flex flex-col
          bg-gray-50 
        `}
      >

        {!isChatOpen && (
          <div className="hidden md:flex flex-1 items-center justify-center text-center overflow-hidden ">
            <div className="object-cover opacity-50">
              <img
                src={navlogo}
                alt="SociallyConnect"
                className="w-56 mx-auto mb-4"
              />
              <p className="text-gray-600 text-sm justify-center ">
                Select a chat to start messaging 
              </p>
            </div>
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
