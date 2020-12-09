module.exports.profile=function(req,res){
    return res.render('profile',{title:'wow'});
}
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{title:'signUp'});
}

module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{title:'signIn'});
}

// get sign up data

module.exports.create=function(req,res){
    // to do
}

module.exports.createSession=function(req,res){
    // to do
}