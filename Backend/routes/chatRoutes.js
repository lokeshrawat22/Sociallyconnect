const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  getOrCreateConversation,
  getMessages,
  getChatList,
  getConversationById
} = require("../controllers/chatController");

router.get("/conversation/:userId", auth, getOrCreateConversation);
router.get("/messages/:id", auth, getMessages);
router.get("/chats", auth, getChatList);
router.get("/conversation/id/:id", auth, getConversationById);

module.exports = router;
