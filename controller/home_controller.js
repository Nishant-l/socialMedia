const Post = require('../model/post');
const User = require('../model/user');

module.exports.home=function(req,res){

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec((err,posts)=>{
        User.find({},(err,allUser)=>{
            return res.render('home.ejs',{
                title:'homePage',
                posts:posts,
                allUser:allUser
            });
        })
    })

}