const mongoose = require('mongoose');

const postSchama = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    comments :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
},{
    timestamps: true
});

const Post = mongoose.model('Post',postSchama);

module.exports = Post;