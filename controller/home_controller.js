module.exports.home=function(req,res){
    // return res.end('<h1>hii</h1>');
    console.log(req.cookies);
    return res.render('home.ejs',{title:'homePage'});
}