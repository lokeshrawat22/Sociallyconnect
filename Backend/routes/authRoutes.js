const express = require('express');
const { register , login , loginusers , updateProfile , getProfile, followUser , getUserFollowers , getUserFollowing, getUserProfile, forgotPassword , resetPassword , globalSearch , getUserPosts} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware.js')
const upload = require("../middleware/uploadMiddleware.js")
const router = express.Router();

router.post('/register' , register);
router.post('/login' , login);
router.get('/users' , authMiddleware , loginusers )
router.get("/profile" , authMiddleware , getProfile)
router.put('/profile', authMiddleware , upload.single("profilePic") , updateProfile)
router.put('/users/:id/follow' , authMiddleware , followUser)
router.get('/users/:id/followers', authMiddleware, getUserFollowers);
router.get('/users/:id/following', authMiddleware, getUserFollowing);
router.get('/users/:id/userProfile', authMiddleware, getUserProfile);
router.get("/posts/user/:id", authMiddleware, getUserPosts);

router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.get("/search", authMiddleware, globalSearch);

module.exports = router;
