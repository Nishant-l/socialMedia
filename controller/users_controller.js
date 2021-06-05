const User=require('../model/user');
module.exports.profile=function(req,res){
    return res.render('profile',{title:'wow'});
}
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }else{
        return res.render('user_sign_up',{title:'signUp'});
    }
    
}

module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile');
    }else{
        return res.render('user_sign_in',{title:'signIn'});
    }
}

// get sign up data

module.exports.create=function(req,res){
    // to do
    if(req.body.password != req.body.conferm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,userr){
        if(err){
            console.log('error occured in finding user in userTable');
            return;
        }

        if(!userr){
            User.create(req.body,function(err,user){
                if(err){console.log('error occured in finding user in signUp');return}

                return res.redirect('/users/signIn');
            });
        }
        else{
            return res.redirect('back');
        }
    })


    
}

module.exports.createSession=function(req,res){
    return res.redirect('/');
}