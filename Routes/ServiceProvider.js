const route=require('express').Router();
const {ServiceProvider,ServiceProviderGoogle,ServiceWork,ServiceWorkG,Service_Work_Book}=require('../dataBase/models_Mongo/People/ServiceProvider');

route.post('/update',async(req,res)=>{
    console.log(req.body);
    try{
        const isPresent=await ServiceProvider.find({username:req.body.username}).limit(1);
        
        if(isPresent==''){
            res.status(200).send('No UserName Exist');
        }else{
            const updateNor=await ServiceProvider.updateOne({_id:[isPresent._id]},{
                name:req.body.name,
                Age:req.body.age,
                Phone:req.body.phone,
                Gender:req.body.gender,
                Description:req.body.description
            });
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
        }
   }catch(err){
        res.status(400).send('error occured');
   } 
})
route.post('/updateG',async(req,res)=>{
    //console.log(req.body);
    try{
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
                    Description:req.body.description
                });
                let result=await provider.save();
                res.status(200).send(req.body);
            }else{
                const provider=await ServiceWorkG.updateOne({username:req.body.username},{
                    profession:req.body.specialization,
                    Age:req.body.age,
                    Phone:req.body.phone,
                    Gender:req.body.gender,
                    Description:req.body.description
                });
                res.status(200).send(req.body);
            }
        }
   }catch(err){
        res.status(400).send('error occured');
   } 
})

route.post('/work_details',async(req,res)=>{
    const work=new Service_Work_Book({
        username:req.body.username,
        StoreName:'sf',
        MachineName:'kj',
        PhoneStore:8585913110,
        Address:'cvh',
        Problem:'kjhgfdsdfghj',
        DateBooked:new Date().getTime()/1000
    })
    const result=await work.save();
    console.log(result.DateBooked.getTime());
    console.log(result);
    res.send('eee');
})

module.exports=route;