const Post = require('../model/post');
const User = require('../model/user');

module.exports.home = async(req,res) => {
    try{
        let posts = await Post.find({})
                  .populate('user')
                  .populate({
                      path: 'comments',
                      populate: {
                          path: 'user'
                      }
                  })
        let users = await User.find({});
    
        return res.render('home.ejs',{
            title: 'HomePage',
            posts:posts,
            allUser:users
        }) 
    }catch(err){
        console.log('Error',err);
        return;
    }

}