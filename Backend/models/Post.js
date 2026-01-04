const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    ref: "user"    },
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const postSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: String, 
    description: String,
    username: String,
    media: String ,
    mediaType: String,

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],

    comments: [commentSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('Post', postSchema)