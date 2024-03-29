const { use } = require('passport');
const User=require('../model/user');

module.exports.profile=function(req,res){
    User.findById(req.params.id,(err,foundUser)=>{
        return res.render('profile',{title:'wow',foundUser:foundUser});
    })
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
        req.flash('error','Password MissMatch');
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
                req.flash('success','New User Created');
                return res.redirect('/users/signIn');
            });
        }
        else{
            req.flash('error','User With Email-Id alredy Exists');
            return res.redirect('back');
        }
    })


    
}

module.exports.createSession=function(req,res){
    req.flash('success','Log In Successfull');
    return res.redirect('/');
}

module.exports.destroySession = (req,res) => {
    req.logout();
    req.flash('success','Log-Out');
    return res.redirect('/');
}

module.exports.update = (req,res) => {
    if(req.body.email.length>0 && req.body.name.length>0){
        User.findByIdAndUpdate(req.user,req.body,async(err,updatedUser)=>{
            req.flash('success','User Info Updated Successfully');
            return res.redirect('back');
        })
    }else{
        req.flash('error','Enter valid info');
        return res.redirect('back');
    }
}