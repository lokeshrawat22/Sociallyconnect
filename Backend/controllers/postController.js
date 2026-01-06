const Post = require("../models/Post.js");
const User = require("../models/User.js");

exports.createPost = async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.user.id);

    if (!req.file) {
      return res.status(400).json({ error: "Media file is required" });
    }

    const isVideo = req.file.mimetype.startsWith("video");

    const post = new Post({
      user: loggedInUser._id,
      title: req.body.title,
      description: req.body.description,
      media: req.file.path,
      mediaPublicId: req.file.filename,
      mediaType: isVideo ? "video" : "image",
    });

    await post.save();

    res.status(201).json({
      message: "Post created",
      post,
    });
  } catch (err) {
    console.error("CREATE POST ERROR:", err);
    res.status(500).json({ error: "Post upload failed" });
  }
};


exports.getAllPosts = async (req, res) => {
  try {
    const currentUserId = req.user?.id || req.user?._id;

    const posts = await Post.find()
      .populate("user", "username name profilePic followers")
      .populate("comments.user", "username profilePic")
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map(post => {
      const isFollowed = currentUserId
        ? post.user.followers.some(
            f => f.toString() === currentUserId.toString()
          )
        : false;

      return {
        ...post.toObject(),
        commentCount: post.comments.length,
        user: {
          _id: post.user._id,
          username: post.user.username,
          name: post.user.name,
          profilePic: post.user.profilePic,
          isFollowed,
        },
      };
    });

    res.json(formattedPosts);
  } catch (err) {
    console.error("GET ALL POSTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};



exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id })
      .populate("user", "username profilePic")
      .populate("comments.user", "username profilePic")
      .sort({ createdAt: -1 });

    const formattedPosts = posts.map(post => ({
      ...post.toObject(),
      commentCount: post.comments.length,
    }));

    res.json(formattedPosts);
  } catch (err) {
    console.error("GET MY POSTS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch my posts" });
  }
};


exports.likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const alreadyLiked = post.likes.includes(req.user.id);

  if (alreadyLiked) {
    post.likes = post.likes.filter(
      id => id.toString() !== req.user.id
    );
  } else {
    post.likes.push(req.user.id);
  }

  await post.save();
  res.json({ likes: post.likes.length });
};


exports.addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.comments.push({
    user: req.user.id,
    text: req.body.text,
  });

  await post.save();

  const populatedPost = await Post.findById(post._id)
    .populate("comments.user", "username profilePic");

  res.json(populatedPost.comments);
};


exports.getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .select("comments")
      .populate("comments.user", "username profilePic");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ comments: post.comments });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch comments",
      error: error.message,
    });
  }
};


exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    
    if (post.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    /* await cloudinary.uploader.destroy(post.mediaPublicId);*/

    await post.deleteOne();


    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("DELETE POST ERROR:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
