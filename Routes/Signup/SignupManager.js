const route=require('express').Router();
const {Manager,ManagerGoogle,ManagerGoogleWork}=require('../../dataBase/models_Mongo/People/Manager');
const validator  = require('validator');

route.post('/',async(req,res)=>{

   // console.log(req.session);
   console.log(req.body);
    try{
        if(!validator.isEmail(req.body.email)){
            res.status(200).send('Email is not valid');
        }else{
        const isPresent=await Manager.find({username:req.body.username}).limit(1);
        if(isPresent.length==0){
            const provider=new Manager({
                username:req.body.username,
                email:req.body.email,
                name:req.body.name,
                Phone:req.body.phone,
                Gender:req.body.gender,
                Password:req.body.password,
                AddressWork:req.body.description
            });
            let result=await provider.save();
            let yt={};
                yt.username=result.username;
                yt.name=result.name;
                yt.Phone=result.Phone;
                yt.Gender=result.Gender;//yt.Password=spe[0].Password;
                yt.Description=result.AddressWork;
                yt.email=result.email;
            //console.log("result = ",result);
            res.status(200).send(yt);
        }else{
            res.status(200).send('Username Already Exists');
        }
    }
   }catch(err){
        console.log(err);
        res.status(400).send('error occured');
   }
    
});
route.post('/google/',async(req,res)=>{
    //console.log(req.body);
    try{
        const isPresent=await ManagerGoogle.find({username:req.body.googleId}).limit(1);
        if(isPresent.length==0){
            const provider=new ManagerGoogle({
                username:req.body.googleId,
                name:req.body.name
            });
            let result=await provider.save();
            //console.log("result = ",result);
            res.status(200).send(result);
        }else{
            res.status(200).send('You Are Already Registered');
        }
   }catch(err){
        console.log(err);
        res.status(400).send('error occured');
   }
    
});

module.exports=route;