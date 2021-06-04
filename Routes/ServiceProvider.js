const route=require('express').Router();
const {ServiceProvider,ServiceProviderGoogle,ServiceWork,ServiceWorkG,Service_Work_Book}=require('../dataBase/models_Mongo/People/ServiceProvider');
const validator  = require('validator');


route.post('/update',async(req,res)=>{
    //console.log("hello");
    //console.log(req.body);
    try{
        if(!validator.isEmail(req.body.email)){
            res.status(200).send('Email is not valid');
        }else{
        const isPresent=await ServiceProvider.find({username:req.body.username}).limit(1);
        
        if(isPresent.length==0){
            res.status(200).send('No UserName Exist');
        }else{
            console.log(isPresent[0]._id);
            const updateNor=await ServiceProvider.updateOne({_id:isPresent[0]._id},{
                name:req.body.name,
                Age:req.body.age,
                Phone:req.body.phone,
                Gender:req.body.gender,
                Description:req.body.description,
                email:req.body.email
            });
            //console.log("updateNor"+" "+updateNor.email);
            const Nee = await ServiceWork.find({username:req.body.username}).limit(1);
            if(Nee==''){
                const provider=new ServiceWork({
                    username:req.body.username,
                    profession:req.body.specialization
                });
                let result=await provider.save();
                res.status(200).send(req.body);
            }else{
                const provider=await ServiceWork.updateOne({username:req.body.username},{
                    profession:req.body.specialization
                });
                res.status(200).send(req.body);
            }
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
        const isPresent=await ServiceProviderGoogle.find({username:req.body.username}).limit(1);
        
        if(isPresent==''){
            res.status(200).send('No UserName Exist');
        }else{
            const updateNor=await ServiceProviderGoogle.updateOne({_id:[isPresent._id]},{
                name:req.body.name
            });
            const Nee = await ServiceWorkG.find({username:req.body.username}).limit(1);
            if(Nee==''){
                const provider=new ServiceWorkG({
                    username:req.body.username,
                    profession:req.body.specialization,
                    Age:req.body.age,
                    Phone:req.body.phone,
                    Gender:req.body.gender,
                    Description:req.body.description,
                    email:req.body.email
                });
                let result=await provider.save();
                res.status(200).send(req.body);
            }else{
                const provider=await ServiceWorkG.updateOne({username:req.body.username},{
                    profession:req.body.specialization,
                    Age:req.body.age,
                    Phone:req.body.phone,
                    Gender:req.body.gender,
                    Description:req.body.description,
                    email:req.body.email
                });
                res.status(200).send(req.body);
            }
        }}
   }catch(err){
        res.status(400).send('error occured');
   } 
})

route.post('/work_details',async(req,res)=>{
    let complaints = await Service_Work_Book.find({username:req.body.username});
    res.send(complaints);
    
    
})

module.exports=route;
//let complaints = await Service_Work_Book.find();
    //console.log('hello');
// const work=new Service_Work_Book({
//     username:req.body.username,
//     StoreName:'sf',
//     MachineName:'kj',
//     PhoneStore:8585913110,
//     Address:'cvh',
//     Problem:'kjhgfdsdfghj',
//     ComplaintNo:100000000+complaints.length
//     //DateBooked:new Date().getTime()/1000
// })
// const result=await work.save();
// // console.log(result.DateBooked.getMinutes());
// console.log(result);
// res.send('aaa');