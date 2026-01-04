import ChatWindow from "../Pages/ChatWindow";

const Chat = ({ conversation }) => {
  if (!conversation) {
    return <div className="h-full flex items-center justify-center">Select a chat</div>;
  }

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const otherUser = conversation.members.find(
    m => m._id !== currentUser._id
  );

  return (
    <ChatWindow
      conversationId={conversation._id}
      otherUser={otherUser}
    />
  );
};
export default Chat;
