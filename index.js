const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const app = express();
const port=8000;

app.use(express.static('./assets'));
// to use ejs layouts
app.use(expressEjsLayouts);
// extract style and script from sub pages into layouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/',require('./routes'));

// setting up views engine
app.set('views','./views');
app.set('view engine','ejs');

app.listen(port,function(err){
    if(err){
        console.log(`error occured in server starting ______----------_______${err}`);
    }
    console.log(`server is running on port ${port}`);
})
