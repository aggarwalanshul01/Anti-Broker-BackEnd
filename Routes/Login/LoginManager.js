const route=require('express').Router();
const {Manager,ManagerGoogle,ManagerGoogleWork} = require('../../dataBase/models_Mongo/People/Manager');


route.post('/', async(req, res) => {
    //console.log(req.body);
    try{
        //console.log(req);
        //console.log("cccccccccccc");
        const isPresent=await Manager.find({username:req.body.username}).limit(1);
        //console.log(isPresent);
        if(isPresent.length==0){
            res.status(200).send('No UserName Exist');
        }else{
            //console.log(isPresent[0]);
            //console.log(req.body.password+" "+isPresent[0].Password);
            if(isPresent[0].Password==req.body.password){
                let yt={};
                yt.username=isPresent[0].username;
                yt.name=isPresent[0].name;
                yt.Phone=isPresent[0].Phone;
                yt.Gender=isPresent[0].Gender;//yt.Password=spe[0].Password;
                yt.Description=isPresent[0].AddressWork;
                yt.email=isPresent[0].email;
                //console.log(yt);
                res.status(200).send(yt);
            }else{
                res.status(200).send("Wrong Password")
            }
        }
   }catch(err){
        //console.log(err);
        res.status(400).send('error occured');
   } 
});

route.post('/google/', async(req, res) => {
    //console.log(req.body);
    //console.log("hello");
    try{
        const isPresent=await ManagerGoogle.find({username:req.body.googleId}).limit(1);
        //console.log(isPresent+" "+req.body.googleId);
        if(isPresent.length==0){
            res.status(200).send('Please Register Yourself Via Signup');
        }else{
            const spe=await ManagerGoogleWork.find({username:req.body.googleId}).limit(1);
            if(spe.length!=0){
                let yt={};
                yt.username=isPresent[0].username;
                yt.name=isPresent[0].name;
                yt.Phone=spe[0].Phone;
                yt.Gender=spe[0].Gender;//yt.Password=spe[0].Password;
                yt.Description=spe[0].AddressWork;
                yt.email=spe[0].email;
                
                res.status(200).send(yt);
            }else{
                res.status(200).send(isPresent[0]);
            } 
        }
   }catch(err){
        res.status(400).send('error occured');
   }
});

module.exports=route;