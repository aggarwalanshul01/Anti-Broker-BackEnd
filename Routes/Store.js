const route=require('express').Router();
const {Store,StoreGoogle,StoreGoogleW}=require('../dataBase/models_Mongo/People/Store');
const {ServiceProvider,ServiceProviderGoogle,ServiceWork,ServiceWorkG,Service_Work_Book}=require('../dataBase/models_Mongo/People/ServiceProvider');

route.post('/update',async(req,res)=>{
    console.log(req.body);
    try{
        const isPresent=await Store.find({username:req.body.username}).limit(1);
        //console.log(isPresent);
        if(isPresent.length==0){
            res.status(200).send('No UserName Exist');
        }else{
            const updateNor=await Store.updateOne({_id:[isPresent[0]._id]},{
                name:req.body.name,
                Phone:req.body.phone,
                Address:req.body.description
            });
            console.log("11 ",updateNor);
            res.status(200).send(req.body);
            
        }
   }catch(err){
        res.status(400).send('error occured');
   } 
})
route.post('/updateG',async(req,res)=>{
    //console.log(req.body);
    try{
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
                    Address:req.body.description
                });
                let result=await provider.save();
                res.status(200).send(req.body);
            }else{
                const provider=await StoreGoogleW.updateOne({username:req.body.username},{
                    Phone:req.body.phone,
                    Address:req.body.description
                });
                res.status(200).send(req.body);
            }
        }
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