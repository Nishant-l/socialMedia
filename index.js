const express = require('express');
const app = express();
const port=8000;

app.listen(port,function(err){
    if(err){
        console.log(`error occured in server starting ______----------_______${err}`);
    }
    console.log(`server is running on port ${port}`);
})
