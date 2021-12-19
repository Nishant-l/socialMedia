const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/social_developement');

const db = mongoose.connection;

db.on('error',console.error.bind('❌ err connecting to database'));

db.once('open',function(){
    console.log('✔️ connected to database:: mangoDB');
})

module.exports=db;