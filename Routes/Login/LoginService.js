const route=require('express').Router();
const {ServiceProvider,ServiceProviderGoogle}=require('../../dataBase/models_Mongo/People/ServiceProvider');


route.post('/', async(req, res) => {
    try{
        //console.log(req);
        //console.log("cccccccccccc");
        const isPresent=await ServiceProvider.find({username:req.body.username}).limit(1);
        //console.log(isPresent);
        if(isPresent==''){
            res.status(200).send('No UserName Exist');
        }else{
            //console.log(isPresent);
            //console.log(req.body.password+" "+isPresent.Password);
            if(isPresent[0].Password==req.body.password){
                res.status(200).send(isPresent[0]);
            }else{
                res.status(200).send("Wrong Password");
            }
        }
   }catch(err){
        //console.log(err);
        res.status(400).send('error occured');
   } 
});

route.post('/google/', async(req, res) => {
    //console.log("hello");
    try{
        const isPresent=await ServiceProviderGoogle.find({username:req.body.googleId}).limit(1);
        //console.log(isPresent+" "+req.body.googleId);
        if(isPresent==''){
            res.status(200).send('Please Register Yourself Via Signup');
        }else{
            res.status(200).send(isPresent[0]); 
        }
   }catch(err){
        res.status(400).send('error occured');
   }
});

module.exports=route;