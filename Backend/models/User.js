const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    name: String,
    bio: String,
    email: { type: String, unique: true },
    password: String,

    // ✅ Cloudinary image URL
    profilePic: String,

    // ✅ Cloudinary public_id (important)
    profilePicId: String,

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],

    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
