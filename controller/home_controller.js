module.exports.home=function(req,res){
    // return res.end('<h1>hii</h1>');
    console.log(req.cookies);
    res.cookie('nishant_lalalal','mmkkll');
    return res.render('home.ejs',{title:'homePage'});
}