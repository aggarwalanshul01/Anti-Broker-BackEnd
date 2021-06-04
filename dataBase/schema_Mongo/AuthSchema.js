const mongoose=require('mongoose');

const AuthService=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String
    },
    name:{
        type: String
    },
    Age:{
        type: Number
    },
    Phone:{
        type:Number,
        minLength:10,
        maxLength:10
    },
    Gender:{
        type: String
    },
    Password:{
        type: String,
        required:true
    },
    Description:{
        type: String,
    }
});

const AuthServiceGoogle=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type: String
    }
});
module.exports={AuthService,AuthServiceGoogle};