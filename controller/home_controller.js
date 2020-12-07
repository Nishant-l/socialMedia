module.exports.home=function(req,res){
    // return res.end('<h1>hii</h1>');
    return res.render('home.ejs',{title:'homePage'});
}