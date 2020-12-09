const mongoose=require('mongoose');

const userSchama=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

const User=mongoose.model('user',userSchama);

module.exports=User;