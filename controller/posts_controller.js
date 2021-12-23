const Post = require('../model/post');

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