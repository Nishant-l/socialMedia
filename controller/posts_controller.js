const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.create = (req,res) =>{
    Post.create({
        comment: req.body.content,
        user: req.user._id
    },(err,user)=>{
        if(err){
            console.log('error in creating user');
            return;
        }
        return res.redirect('back');
    })
}

module.exports.destroy = (req,res) => {
    Post.findById(req.params.id,(err,post) => {
        if(post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post:req.params.id},(err)=>{
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    });
}