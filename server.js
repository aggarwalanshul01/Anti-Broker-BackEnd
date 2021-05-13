const express=require('express');
//const ServiceProvider=require('./dataBase/models_Mongo/People/ServiceProvider');
const app=express();
const PORT=process.env.PORT || 4444;
const mongoose=require('mongoose');
const session=require('express-session');
cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/signup_service',require('./Routes/Signup'));

mongoose.connect("mongodb://localhost:27017/Authentication",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log('connection success for mongodb');
}).catch((err)=>{
    console.log("mongo not connected "+err);
});

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'skadh32iehb37iudhebiwqnhk92ueniedn'
}));

// const provider=new ServiceProvider({
//     username:'gssfsssdasdfgserthj',
//     name:'aggarwalanshul01',
//     Age:'23',
//     Phone:'9999999999',
//     Gender:'male',
//     Password:'aaaa',
//     Description:'sadfsdgfhgjyrterea'
// });
// provider.save();

app.listen(PORT,()=>{
    console.log("server started");
})
// app.get('/',(req,res)=>{
//     res.send('hello');
// })
// app.get('/abc',(req,res)=>{
//     res.send('hello');
// })