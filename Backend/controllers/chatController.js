const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

/* 🚫 BLOCK SELF CHAT */
exports.getOrCreateConversation = async (req, res) => {
  const { userId } = req.params;

  // 🚫 BLOCK SELF CHAT
  if (userId === req.user.id) {
    return res.status(400).json({
      message: "You cannot chat with yourself"
    });
  }

  let convo = await Conversation.findOne({
    members: { $all: [req.user.id, userId] }
  });

  if (!convo) {
    convo = await Conversation.create({
      members: [req.user.id, userId]
    });
  }

  res.json(convo);
};

/* 💬 GET MESSAGES */
exports.getMessages = async (req, res) => {
  const messages = await Message.find({
    conversationId: req.params.id
  }).populate("sender", "username profilePic");

  res.json(messages);
};

/* 📜 CHAT LIST */
exports.getChatList = async (req, res) => {
  const chats = await Conversation.find({
    members: req.user.id
  })
    .populate("members", "username profilePic")
    .sort({ updatedAt: -1 });

  res.json(chats);
};

/* 🧠 GET CONVERSATION DETAILS */
exports.getConversationById = async (req, res) => {
  const convo = await Conversation.findById(req.params.id)
    .populate("members", "username profilePic");

  res.json(convo);
};
