const mongoose = require('mongoose');

const commentSchama = mongoose.Schema({
    comment: {
        type: String,
        requirrd: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    post: {
        type: mongoose.Schema.type.ObjectId,
        ref: "Post",
        required: true
    }
},{
    tymestamp: true
})

const Comment = mongoose.model("Comment",commentSchama);

module.exports = Comment;