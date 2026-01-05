const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_pics", // Cloudinary folder
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: () => `profile_${Date.now()}`,
  },
});

const uploadPost = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Only image allowed"));
    }
  },
});

module.exports = uploadPost;
