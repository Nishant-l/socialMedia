const Post = require('../model/post');

module.exports.home=function(req,res){

    Post.find({})
    .populate('user')
    .exec((err,posts)=>{
        return res.render('home.ejs',{
            title:'homePage',
            posts:posts,
        });
    })

}