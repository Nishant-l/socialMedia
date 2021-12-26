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
const MongoStore = require('connect-mongo');

app.use(express.urlencoded({extended:true}));
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

// mongostore is used to store session cookie
app.use(session({
    name:'social',
    secret:'nishant11',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl:db.client.s.url,
        autoRemove: 'disabled'
    },(err)=>console.log(`error connecting to mongoDb during session creation ${err}`))
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

// use express router
app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log(`❌ error occured in server starting ______----------_______${err}`);
    }
    console.log(`✔️ server is running on port ${port}`);
})
