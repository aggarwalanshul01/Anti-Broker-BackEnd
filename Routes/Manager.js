const route=require('express').Router();
const {Manager,ManagerGoogle,ManagerGoogleWork}=require('../dataBase/models_Mongo/People/Manager');
const {Service_Work_Book} = require('../dataBase/models_Mongo/People/ServiceProvider');

const validator  = require('validator');
var nodemailer = require('nodemailer');
const pass=require('../per/per');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'antibrokerofficial@gmail.com',
      pass: pass
    }
  });

route.post('/update',async(req,res)=>{
    //console.log("hello");
    //console.log(req.body);
    try{
        if(!validator.isEmail(req.body.email)){
            res.status(200).send('Email is not valid');
        }else{
        const isPresent=await Manager.find({username:req.body.username}).limit(1);
        
        if(isPresent.length==0){
            res.status(200).send('No UserName Exist');
        }else{
            console.log(isPresent[0]._id);
            const updateNor=await Manager.updateOne({_id:isPresent[0]._id},{
                name:req.body.name,
                Phone:req.body.phone,
                Gender:req.body.gender,
                AddressWork:req.body.description,
                email:req.body.email,
            });
            
            res.status(200).send(req.body);
            
        }}
   }catch(err){
        res.status(400).send('error occured');
   } 
})
route.post('/updateG',async(req,res)=>{
    //console.log(req.body);
    try{
        if(!validator.isEmail(req.body.email)){
            res.status(200).send('Email is not valid');
        }else{
        const isPresent=await ManagerGoogle.find({username:req.body.username}).limit(1);
        
        if(isPresent==''){
            res.status(200).send('No UserName Exist');
        }else{
            const updateNor=await ManagerGoogle.updateOne({_id:[isPresent._id]},{
                name:req.body.name
            });
            const Nee = await ManagerGoogleWork.find({username:req.body.username}).limit(1);
            if(Nee.length==0){
                const provider=new ManagerGoogleWork({
                    username:req.body.username,
                    Phone:req.body.phone,
                    Gender:req.body.gender,
                    AddressWork:req.body.description,
                    email:req.body.email
                });
                let result=await provider.save();
                res.status(200).send(req.body);
            }else{
                const provider=await ManagerGoogleWork.updateOne({username:req.body.username},{
                    Phone:req.body.phone,
                    Gender:req.body.gender,
                    AddressWork:req.body.description,
                    email:req.body.email
                });
                res.status(200).send(req.body);
            }
        }}
   }catch(err){
        res.status(400).send('error occured');
   } 
})
route.get('/allComp',async(req,res)=>{
    let comp=await Service_Work_Book.find();

    res.send(comp);
})


module.exports=route;
