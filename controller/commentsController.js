const Comment = require('../model/comment');
const Post = require('../model/post');

module.exports.create = async (req,res) => {
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                comment: req.body.comment,
                user: req.user._id,
                post: post._id
            })
            await post.comments.push(comment);
            await post.save();
            req.flash('success','Comment on Post');
            return res.redirect('/');
        }else{
            console.log('post want to comment not found');
            req.flash('error','Error commenting');
            return res.redirect('back');
        }
    }catch(err){
        console.log('Error in storing comment',err);
        return;
    }
}

module.exports.deleteComment = async (req,res) => {
    try{
        const comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.user;
            comment.remove();
            await Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}});
            req.flash('success','Comment Deleated');
            return res.redirect('back');
        }else{
            req.flash('error','Error Deleting Comment');
            return res.redirect('back');
        }
    }catch(err){
        console.log('error in deleting a comment',err);
    }
    
}