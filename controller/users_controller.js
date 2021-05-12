const User=require('../model/user');
module.exports.profile=function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('profile',{title:'user_profile',user:user});
            }
        })
    }else{
        return res.redirect('/users/signIn');
    }
    
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
    
// steps to authenticate
    // find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error while finding user');return}
        // handel user faound
        if(user){

            // handle password missmatch
            if(req.body.password!=user.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }else{
            
            // hqandle user not found
            return res.redirect('back');
            
        }

    })



}

module.exports.signOut=function(req,res){
    if(req.cookies.user_id){
        res.clearCookie('user_id');
        return res.redirect('/users/signIn');
    }else{
        return res.redirect('back');
    }

}