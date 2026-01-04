const jwt = require("jsonwebtoken");
const Message = require("../models/Message");

const onlineUsers = new Map();

module.exports = (io) => {
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.userId);

    onlineUsers.set(socket.userId, socket.id);
    io.emit("userOnline", socket.userId);

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    });

    // ✍️ Typing
    socket.on("typing", ({ roomId }) => {
      socket.to(roomId).emit("typing");
    });

    socket.on("stopTyping", ({ roomId }) => {
      socket.to(roomId).emit("stopTyping");
    });
    socket.on("leaveRoom", (roomId) => {
  socket.leave(roomId);
});


    // 📩 Send message
    socket.on("sendMessage", async (data) => {
      const msg = await Message.create({
        conversationId: data.conversationId,
        sender: socket.userId,
        text: data.text,
        media: data.media,
        mediaType: data.mediaType
      });

      const populated = await msg.populate(
        "sender",
        "username profilePic"
      );

      io.to(data.conversationId).emit("receiveMessage", populated);
    });

    // 👁 Seen
    socket.on("seenMessages", async ({ conversationId }) => {
      await Message.updateMany(
        { conversationId, seen: false },
        { seen: true }
      );

      socket.to(conversationId).emit("messagesSeen");
    });

   socket.on("editMessage", async ({ messageId, newText }) => {
  const msg = await Message.findById(messageId);

  if (!msg) return;
  if (msg.sender.toString() !== socket.userId) return;

  msg.text = newText;
  msg.edited = true;
  await msg.save();

  // 🔥 POPULATE BEFORE EMIT
  const populatedMsg = await Message.findById(msg._id)
    .populate("sender", "username profilePic");

  io.to(msg.conversationId.toString()).emit(
    "messageEdited",
    populatedMsg
  );
});

   
    socket.on("deleteMessageForEveryone", async ({ messageId }) => {
  const msg = await Message.findById(messageId);

  if (!msg) return;
  if (msg.sender.toString() !== socket.userId) return;

  msg.text = "Message deleted";
  msg.deletedForEveryone = true;
  msg.media = null;
  await msg.save();

  const populatedMsg = await Message.findById(msg._id)
    .populate("sender", "username profilePic");

  io.to(msg.conversationId.toString()).emit(
    "messageEdited",
    populatedMsg
  );
});


    socket.on("disconnect", () => {
      onlineUsers.delete(socket.userId);
      io.emit("userOffline", socket.userId);
      console.log("User disconnected:", socket.userId);
    });
  });
};
