const { use } = require('passport');
const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../model/user');


// Passport Local Authentication
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback: true
    },function(req,email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log(`err ---Passport-----> ${err}`);
                req.flash('error',err);
                return done(err);
            }
            if(!user || user.password!=password){
                console.log(`invallid username or password`);
                req.flash('error','Email/Password Incorrect')
                return done(null,false);
            }

            return done(null,user);
        });
    }
    
));

// serilizing the user to decide wich key is to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})

// deserilizing the user from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error decerilizing');
            return done(err);
        }
        return done(null,user);
    });
});

// check if user is authenticate
passport.checkAuthentication = function(req,res,next){
    // if user is signed in pass on the request to next function
    if(req.isAuthenticated()){
        return next();
    }

    //if user is not signed in 
    return res.redirect('/users/signIn');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current user in responce we are setting up local
        res.locals.user = req.user;
        
    }
    next();
}

module.exports=passport;