const Comment = require('../model/comment');
const Post = require('../model/post');

module.exports.create = (req,res) => {
    Post.findById(req.body.post,(err,post)=>{
        if(post){
            Comment.create({
                comment: req.body.comment,
                user: req.user._id,
                post: post._id
            },(err,comment)=>{
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            })
        }
    })
}