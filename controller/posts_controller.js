const Post = require('../model/post');
const Comment = require('../model/comment');

module.exports.create = async(req,res) =>{
    try{
        const post = await Post.create({
            comment: req.body.content,
            user: req.user._id
        });

        const toSend = await Post.findById(post.id).populate('user') ;

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post: {
                        name: toSend.user.name,
                        comment: toSend.comment,
                        id: toSend.id
                    }
                },
                message: "post Created"
            });
        }

        req.flash('success','Post Created');
        return res.redirect('back');
    }catch(err){
        console.log('error in creating user');
        req.flash('erroe','Error creating new Post');
        return;
    }
    
}

module.exports.destroy = async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            await post.remove();
            await Comment.deleteMany({post:req.params.id});
            req.flash('success','Post Deleated Successfully');
            return res.redirect('back');
        }
    }catch(err){
        console.log('error deleting a post',err);
        req.flash('error','Error Deleting Post');
        return res.redirect('back');
    }
}