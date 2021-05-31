const mongoose=require('mongoose');

const AuthService=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type: String
    },
    Phone:{
        type:Number,
        minLength:10,
        maxLength:10
    },
    Password:{
        type: String,
        required:true
    },
    Address:{
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

const Store_Work_Google = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    Phone:{
        type:Number,
        minLength:10,
        maxLength:10,
        required:true
    },
    Address:{
        type: String,
    }
});
module.exports={AuthService,AuthServiceGoogle,Store_Work_Google};