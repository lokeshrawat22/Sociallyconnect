const express = require("express");
const router = express.Router();
const authMidleware = require('../middleware/authMiddleware.js')
const uploadPost = require('../middleware/postUpload.js');
const {createPost ,  getAllPosts , getMyPosts, likePost, addComment , getPostComments} = require("../controllers/postController.js");

router.post('/posts', authMidleware,  uploadPost.single("media"), createPost);
router.get('/posts' , authMidleware, getAllPosts)
router.get("/posts/me" , authMidleware , getMyPosts)
router.put('/posts/:id/like', authMidleware , likePost);
router.post('/posts/:id/comment', authMidleware , addComment);
router.get("/posts/:id/comments", authMidleware, getPostComments);
module.exports = router;