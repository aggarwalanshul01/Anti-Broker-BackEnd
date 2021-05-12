const express=require('express');
cors = require("cors");
const app=express();
const PORT=process.env.PORT || 3001

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT,()=>{
    console.log("server started");
})
app.get('/',(req,res)=>{
    res.send('hello');
})
app.get('/abc',(req,res)=>{
    res.send('hello');
})