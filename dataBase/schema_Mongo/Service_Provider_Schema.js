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
    email:String,
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
    usernameStore:{
        type:String
    },
    DateBooked:{
        type:String
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
    },
    IsDone:{
        type:Number,
        default:0
    },
    ComplaintNo:{
        type:String,
        required:true
    },
    IsFinal:{
        type:String
    },
    NameEngi:{
        type:String,
        default:''
    },PhoneEngi:{
        type:Number,
        default:'0'
    }
});



module.exports={Service_Work,Service_Work_Google,Service_Work_Booked};