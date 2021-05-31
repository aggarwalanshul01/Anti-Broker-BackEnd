const route=require('express').Router();
const {Store,StoreGoogle}=require('../../dataBase/models_Mongo/People/Store');

route.post('/',async(req,res)=>{
   // console.log(req.session);
   //console.log("ccccc");
    try{
       // console.log("hello");
        const isPresent=await Store.find({username:req.body.username}).limit(1);
        if(isPresent==''){
            const provider=new Store({
                username:req.body.username,
                name:req.body.name,
                Phone:req.body.phone,
                Password:req.body.password,
                Address:req.body.description
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
        const isPresent=await StoreGoogle.find({username:req.body.googleId}).limit(1);
        if(isPresent==''){
            const provider=new StoreGoogle({
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