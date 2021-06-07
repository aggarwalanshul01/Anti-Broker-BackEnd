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
    AddressWork:{
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


const Manager_Work_Google = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String
    },
    Phone:{
        type:Number,
        minLength:10,
        maxLength:10
    },
    Gender:{
        type: String
    },
    AddressWork:{
        type: String,
    }
});

module.exports={AuthService,AuthServiceGoogle,Manager_Work_Google};