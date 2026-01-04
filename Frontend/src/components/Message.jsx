const Message = ({ msg, currentUser }) => {
  const senderId =
    typeof msg.sender === "object" ? msg.sender._id : msg.sender;

  const isSender = String(senderId) === String(currentUser._id);

  return (
    <div className={`flex mb-2 ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-xl max-w-[70%] text-sm ${
          isSender ? "bg-indigo-600 text-white" : "bg-white border"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
};

export default Message;
