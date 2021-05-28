const { use } = require('passport');
const passport=require('passport');

const LocalStrategy=require('passport-local');

const User=require('../model/user');


// Passport Local Authentication
passport.use(new LocalStrategy({
    usernameField:'email'
    },function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log(`err ---Passport-----> ${err}`);
                return done(err);
            }
            if(!user || user.password!=password){
                console.log(`invallid username or password`);
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

module.exports=passport;