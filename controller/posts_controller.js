const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.create = async(req,res) =>{
    try{
        const post = await Post.create({
            comment: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    }catch(err){
        console.log('error in creating user');
        return;
    }
    
}

module.exports.destroy = async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            await post.remove();
            await Comment.deleteMany({post:req.params.id});
            return res.redirect('back');
        }
    }catch(err){
        console.log('error deleting a post',err);
        return res.redirect('back');
    }
}