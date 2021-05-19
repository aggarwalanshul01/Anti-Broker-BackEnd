const route=require('express').Router();
const {ServiceProvider,ServiceProviderGoogle}=require('../../dataBase/models_Mongo/People/ServiceProvider');

route.post('/',async(req,res)=>{
   // console.log(req.session);
    try{
        const isPresent=await ServiceProvider.find({username:req.body.username}).limit(1);
        if(isPresent==''){
            const provider=new ServiceProvider({
                username:req.body.username,
                name:req.body.name,
                Age:req.body.age,
                Phone:req.body.phone,
                Gender:req.body.gender,
                Password:req.body.password,
                Description:req.body.description
            });
            let result=await provider.save();
            //console.log("result = ",result);
            res.status(200).send(result);
        }else{
            res.status(200).send('Username Already Exists');
        }
   }catch(err){
        console.log(err);
        res.status(400).send('error occured');
   }
    
});
route.post('/google/',async(req,res)=>{
    //console.log(req.body);
    try{
        const isPresent=await ServiceProviderGoogle.find({username:req.body.googleId}).limit(1);
        if(isPresent==''){
            const provider=new ServiceProviderGoogle({
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