const express=require('express');
//const ServiceProvider=require('./dataBase/models_Mongo/People/ServiceProvider');
const app=express();
const PORT=process.env.PORT || 3001;
const mongoose=require('mongoose');
const session=require('express-session');
cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/signup_service',require('./Routes/Signup/SignupService'));
app.use('/signup_store',require('./Routes/Signup/SignupStore'));
app.use('/signup_manager',require('./Routes/Signup/SignupManager'));
app.use('/login_service',require('./Routes/Login/LoginService'));
app.use('/login_store',require('./Routes/Login/LoginStore'));
app.use('/login_manager',require('./Routes/Login/LoginManager'));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'skadh32iehb37iudhebiwqnhk92ueniedn',
    cookie:{
        httpOnly:true,
    }
}))

mongoose.connect("mongodb://localhost:27017/Authentication",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('connection success for mongodb');
}).catch((err)=>{
    console.log("mongo not connected "+err);
})

app.listen(PORT,()=>{
    console.log("server started");
})
