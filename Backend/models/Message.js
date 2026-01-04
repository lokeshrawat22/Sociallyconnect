const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation"
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  text: String,

  media: String,
  mediaType: String,

  seen: {
    type: Boolean,
    default: false
  },

  edited: {
    type: Boolean,
    default: false
  },

  deletedForEveryone: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Message", messageSchema);
