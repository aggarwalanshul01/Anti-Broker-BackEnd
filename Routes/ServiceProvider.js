const route=require('express').Router();
const {ServiceProvider,ServiceProviderGoogle,ServiceWork,ServiceWorkG,Service_Work_Book}=require('../dataBase/models_Mongo/People/ServiceProvider');
const {Store,StoreGoogle,StoreGoogleW}=require('../dataBase/models_Mongo/People/Store');
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

route.post('/finalize',async(req,res)=>{
    try{
    
    await Service_Work_Book.updateOne({_id:req.body.id},{
        NameEngi:req.body.NameEngi,PhoneEngi:req.body.PhoneEngi,
        IsFinal:1
    });
    let complaints = await Service_Work_Book.find({_id:req.body.id});
    //console.log(complaints);
    let isp = await Store.find({username:req.body.usernameStore}).limit(1);
        if(isp.length==0){
            //console.log(ispp[0]);
            let ispp = await StoreGoogleW.find({username:req.body.usernameStore}).limit(1);
            var mailOptions = {
                from: 'antibrokerofficial@gmail.com',
                to: ispp[0].email,
                subject: `Complaint No : ${complaints[0].ComplaintNo} Finalized, To Be Fixed By ${complaints[0].NameEngi}`,
                html: `<div><b>Username Service Provider </b><p>${complaints[0].username}</p></div>
                <div><b>Mechanic Name </b><p>${complaints[0].NameEngi}</p></div>
                <div><b>Mechanic PhoneNo </b><p>${complaints[0].PhoneEngi}</p></div>
                <div><b>Equipment</b><p>${complaints[0].MachineName}</p></div>
                <div><b>Problem Faced</b><p>${complaints[0].Problem}</p></div>`        
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                //  console.log('Email sent: ' + info.response);
                }
              });
        }else{
            //console.log(isp[0]);
            var mailOptions = {
                from: 'antibrokerofficial@gmail.com',
                to: isp[0].email,
                subject: `Complaint No : ${complaints[0].ComplaintNo} Finalized, To Be Fixed By ${complaints[0].NameEngi}`,
                html: `<div><b>Username Service Provider </b><p>${complaints[0].username}</p></div>
                <div><b>Mechanic Name </b><p>${complaints[0].NameEngi}</p></div>
                <div><b>Mechanic PhoneNo </b><p>${complaints[0].PhoneEngi}</p></div>
                <div><b>Equipment</b><p>${complaints[0].MachineName}</p></div>
                <div><b>Problem Faced</b><p>${complaints[0].Problem}</p></div>`       
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                 // console.log('Email sent: ' + info.response);
                }
              });
        }
        res.status(200).send('hello');
    }catch(err){
        res.status(400).send('error occured');
   } 
})

route.post('/close',async(req,res)=>{
    try{
        
        let complaints = await Service_Work_Book.updateOne({_id:req.body.id},{
            IsDone:1
        });
        res.status(200).send('hello');
    }catch(err){
        res.status(400).send('error occured');
   } 
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