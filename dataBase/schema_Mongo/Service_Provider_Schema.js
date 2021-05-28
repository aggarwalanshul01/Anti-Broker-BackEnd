const mongoose=require('mongoose');

const Service_Work=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    profession:{
        type:String,
        required:true
    }
});

const Service_Work_Google = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    profession:{
        type:String,
        required:true
    },
    Age:{
        type: Number,
        required:true
    },
    Phone:{
        type:Number,
        minLength:10,
        maxLength:10,
        required:true
    },
    Gender:{
        type: String
    },
    Description:{
        type: String,
    }
});

const Service_Work_Booked = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    DateBooked:{
        type:Date,
        default:Date.now(),
    },
    StoreName:{
        type:String,
        required:true
    },
    MachineName:{
        type:String
    },
    PhoneStore:{
        type:Number,
        minLength:10,
        maxLength:10
    },
    Address:{
        type:String
    },
    Problem:{
        type:String
    }
    
});

module.exports={Service_Work,Service_Work_Google,Service_Work_Booked};