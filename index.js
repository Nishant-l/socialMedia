const express = require('express');
const cookieParser=require('cookie-parser');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port=8000;
const db=require('./config/mongoose');
// used for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/pasport-local-strategy');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));
// to use ejs layouts
app.use(expressEjsLayouts);
// extract style and script from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// setting up views engine
app.set('views','./views');
app.set('view engine','ejs');

// 
app.use(session({
    name:'social',
    secret:'nishant11',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`❌ error occured in server starting ______----------_______${err}`);
    }
    console.log(`✔️ server is running on port ${port}`);
})
