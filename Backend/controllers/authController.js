const User = require('../models/User.js');
const Post = require ('../models/Post.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmail.js")

exports.register = async (req, res) => {
  try {
    const {username ,  name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "User already exists" });
    }

    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


exports.login = async(req, res)=>{
    const {email , password} = req.body;

    const user = await User.findOne({email});
    if(!user) 
        { return 
    res.status(400).json({error: "User not found"})
    }
    const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) {
            return 
        res.status(400).json({error: "Invalid Credentials"});
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.json({ token,  user: { username: user.username , name: user.name , email: user.email}});
}

exports.loginusers = async (req , res)=>{
     try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.username = req.body.username || user.username;
    user.name = req.body.name || user.name;
    user.bio = req.body.bio || user.bio;

    if (req.file) {
      user.profilePic = req.file.path;       
      user.profilePicId = req.file.filename; 
    }

    await user.save();

    res.json({
      message: "Profile updated Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Profile update failed" });
  }
};


exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("-password")
  res.json({
    ...user._doc,
    followersCount: user.followers.length,
    followingCount: user.following.length
  });
};



exports.followUser = async (req , res) => {
  try {
    const userToFollow = await User.findById(req.params.id);
    const currentUser = await User.findById(req.user.id);

    if (req.params.id === req.user.id) {
  return res.status(400).json({ message: "You cannot follow yourself" });
}


    if(!userToFollow){
      return res.status(404).json({message: "User not found"});
    }

    if(currentUser.following.includes(userToFollow._id)){
      currentUser.following.pull(userToFollow._id);
      userToFollow.followers.pull(currentUser._id);
    } else {
      
      currentUser.following.push(userToFollow._id);
      userToFollow.followers.push(currentUser._id);
    }

    await currentUser.save();
    await userToFollow.save();

    res.json({
      following: currentUser.following.length,
      followers: userToFollow.followers.length
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

exports.getUserProfile = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await User.findById(id)
      .select("username name bio profilePic followers following");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const currentUserId = req.user?.id || req.user?._id;

    const isFollowed = currentUserId
      ? user.followers.some(
          (followerId) => followerId.toString() === currentUserId.toString()
        )
      : false;

    return res.json({
      _id: user._id,
      username: user.username,
      name: user.name,
      bio: user.bio,
      profilePic: user.profilePic,

      followersCount: user.followers.length,
      followingCount: user.following.length,

      isFollowed
    });

  } catch (error) {
    console.error("getUserProfile error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};




exports.getUserFollowers = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("followers", "username name profilePic");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.followers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserFollowing = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).populate("following", "username name profilePic");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.following); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const currentUserId = req.user?.id || req.user?._id;

    const posts = await Post.find({ user: req.params.id })
      .populate("user", "username profilePic followers")
      .sort({ createdAt: -1 });

    const updatedPosts = posts.map(post => {
      const isFollowed = currentUserId
        ? post.user.followers.some(
            f => f.toString() === currentUserId.toString()
          )
        : false;

      return {
        ...post.toObject(),
        user: {
          _id: post.user._id,
          username: post.user.username,
          profilePic: post.user.profilePic,
          isFollowed
        }
      };
    });

    res.json(updatedPosts);
  } catch (err) {
    console.error("getUserPosts error:", err);
    res.status(500).json({ message: "Failed to fetch user posts" });
  }
};




exports.forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:30px;">
        <div style="
          max-width:600px;
          margin:auto;
          background:white;
          padding:30px;
          border-radius:10px;
          box-shadow:0 10px 25px rgba(0,0,0,0.05);
        ">

          <h2 style="color:#111827;">Reset your password</h2>

          <p style="color:#374151;">
            We received a request to reset the password for your
            <strong>SociallyConnect</strong> account.
          </p>

          <p style="color:#374151;">
            Click the button below to create a new password.
            This link is valid for <strong>10 minutes</strong>.
          </p>

          <div style="text-align:center; margin:30px 0;">
            <a href="${resetUrl}" style="
              display:inline-block;
              padding:12px 24px;
              background:#4f46e5;
              color:#ffffff;
              text-decoration:none;
              border-radius:6px;
              font-weight:bold;
            ">
              Reset Password
            </a>
          </div>

          <p style="font-size:14px; color:#6b7280;">
            If the button doesn’t work, copy and paste this link into your browser:
          </p>

          <p style="
            font-size:14px;
            word-break:break-all;
            color:#2563eb;
          ">
            ${resetUrl}
          </p>

          <hr style="margin:30px 0;" />

          <p style="font-size:13px; color:#6b7280;">
            ⚠️ <strong>Security Notice:</strong><br/>
            If you did not request a password reset, please ignore this email.
            Your account will remain secure.
          </p>

          <p style="font-size:13px; color:#6b7280;">
            For your safety, never share this link with anyone.
          </p>

          <p style="margin-top:30px; color:#374151;">
            Regards,<br/>
            <strong>SociallyConnect Security Team</strong>
          </p>

        </div>
      </div>
    `;

    sendEmail({
      to: user.email,
      subject: "Reset your SociallyConnect password",
      html,
    }).catch(err => console.error("EMAIL ERROR:", err));

    res.json({ message: "Password reset link sent to your email" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



exports.globalSearch = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.json({ users: [], posts: [] });
    }

    const regex = new RegExp(q, "i"); 

    const users = await User.find({
      $or: [{ username: regex }, { name: regex }]
    }).select("username name profilePic");

    const posts = await Post.find({
      title: regex
    }).populate("user", "username profilePic");

    res.json({ users, posts });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};