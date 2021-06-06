const route=require('express').Router();
const {Store,StoreGoogle,StoreGoogleW}=require('../dataBase/models_Mongo/People/Store');
const {ServiceProvider,ServiceProviderGoogle,ServiceWork,ServiceWorkG,Service_Work_Book}=require('../dataBase/models_Mongo/People/ServiceProvider');
const pass=require('../per/per');
const validator  = require('validator');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'antibrokerofficial@gmail.com',
    pass: pass
  }
});
route.post('/update',async(req,res)=>{
    //console.log(req.body);
    try{
        if(!validator.isEmail(req.body.email)){
            res.status(200).send('Email is not valid');
        }else{
        const isPresent=await Store.find({username:req.body.username}).limit(1);
        //console.log(isPresent);
        if(isPresent.length==0){
            res.status(200).send('No UserName Exist');
        }else{
            const updateNor=await Store.updateOne({_id:[isPresent[0]._id]},{
                name:req.body.name,
                Phone:req.body.phone,
                Address:req.body.description,
                email:req.body.email
            });
            //console.log("11 ",updateNor);
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

        const isPresent=await StoreGoogle.find({username:req.body.username}).limit(1);
        
        if(isPresent.length==0){
            res.status(200).send('No UserName Exist');
        }else{
            const updateNor=await StoreGoogle.updateOne({_id:[isPresent[0]._id]},{
                name:req.body.name
            });
            const Nee = await StoreGoogleW.find({username:req.body.username}).limit(1);
            if(Nee.length==0){
                const provider=new StoreGoogleW({
                    username:req.body.username,
                    Phone:req.body.phone,
                    Address:req.body.description,
                    email:req.body.email
                });
                let result=await provider.save();
                res.status(200).send(req.body);
            }else{
                const provider=await StoreGoogleW.updateOne({username:req.body.username},{
                    Phone:req.body.phone,
                    Address:req.body.description,
                    email:req.body.email
                });
                res.status(200).send(req.body);
            }
        }}
   }catch(err){
        res.status(400).send('error occured');
   } 
})
route.get('/getAllProviders',async(req,res)=>{
    try{
        let result=[];
        let providerNormal=await ServiceProvider.find({});
        let providerNormalWork=await ServiceWork.find({});
        let providerG=await ServiceProviderGoogle.find({});
        let providerGWork=await ServiceWorkG.find({});
        for(let i=0;i<providerNormal.length;i++){
            let username=providerNormal[i].username;
            for(let j=0;j<providerNormalWork.length;j++){
                if(providerNormalWork[j].username==username){
                    let curr={
                        username:providerNormalWork[j].username,
                        profession:providerNormalWork[j].profession,
                        name:providerNormal[i].name,
                        Phone:providerNormal[i].Phone,
                        Description:providerNormal[i].Description
                    }
                    result.push(curr);
                    break;
                }
            }
        }for(let i=0;i<providerG.length;i++){
            let username=providerG[i].username;
            for(let j=0;j<providerGWork.length;j++){
                if(providerGWork[j].username==username){
                    let curr={
                        username:providerGWork[j].username,
                        profession:providerGWork[j].profession,
                        name:providerG[i].name,
                        Phone:providerGWork[i].Phone,
                        Description:providerGWork[i].Description
                    }
                    result.push(curr);
                    break;
                }
            }
        }res.send(result);
    }catch(err){
        console.log(err);
        res.send('error occured');
    }
})
route.post('/makeComplaint',async(req,res)=>{
    //console.log('hello');
    console.log(req.body);
    
    try{
        let complaints = await Service_Work_Book.find();
        const work=new Service_Work_Book({
        username:req.body.username,
        usernameStore:req.body.usernameStore,
        StoreName:req.body.StoreName,
        MachineName:req.body.MachineName,
        PhoneStore:req.body.PhoneStore,
        Address:req.body.Address,
        Problem:req.body.Problem,
        ComplaintNo:100000000+complaints.length,
        DateBooked:req.body.DateBooked,
        IsFinal:0
        })

        const result=await work.save();

        let isp = await ServiceProvider.find({username:req.body.username}).limit(1);
        if(isp.length==0){
            //console.log(ispp[0]);
            let ispp = await ServiceWorkG.find({username:req.body.username}).limit(1);
            var mailOptions = {
                from: 'antibrokerofficial@gmail.com',
                to: ispp[0].email,
                subject: `Anti Broker Complaint No : ${result.ComplaintNo}`,
                
                html: `<div><b>Store Name </b><p>${result.StoreName}</p></div>
                <div><b>Address </b><p>${result.Address}</p></div>
                <div><b>Store PhoneNo </b><p>${result.PhoneStore}</p></div>
                <div><b>Equipment</b><p>${result.MachineName}</p></div>
                <div><b>Problem Faced</b><p>${result.Problem}</p></div>`        
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
                subject: `Anti Broker Complaint No : ${result.ComplaintNo}`,
                html: `<div><b>Store Name </b><p>${result.StoreName}</p></div>
                <div><b>Address </b><p>${result.Address}</p></div>
                <div><b>Store PhoneNo </b><p>${result.PhoneStore}</p></div>
                <div><b>Equipment</b><p>${result.MachineName}</p></div>
                <div><b>Problem Faced</b><p>${result.Problem}</p></div>`         
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                 // console.log('Email sent: ' + info.response);
                }
              });
        }
        


        res.status(200).send({CompNo:result.ComplaintNo,MSRNo:result._id});
    }catch(err){
        res.status(404).sendStatus(err);
    }
})
route.post('/comp_store',async(req,res)=>{
    try{
        let book = await Service_Work_Book.find({usernameStore:req.body.username});
        res.status(200).send(book);
    }catch(err){
        res.status(404).sendStatus(err);
    }
})


module.exports=route;