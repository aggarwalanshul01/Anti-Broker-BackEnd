const route=require('express').Router();
const {Store,StoreGoogle,StoreGoogleW}=require('../../dataBase/models_Mongo/People/Store');


route.post('/', async(req, res) => {
    try{
        //console.log(req);
        //console.log("cccccccccccc");
        const isPresent=await Store.find({username:req.body.username}).limit(1);
        console.log("aaa",isPresent);
        if(isPresent==''){
            res.status(200).send('No UserName Exist');
        }else{
           // console.log("aaaaaaaa ",isPresent);
          //  console.log(req.body.password+" "+isPresent.Password);
            if(isPresent[0].Password==req.body.password){
                res.status(200).send(isPresent[0]);
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
    //console.log("hello");
    try{
        const isPresent=await StoreGoogle.find({username:req.body.googleId}).limit(1);
        //console.log(isPresent+" "+req.body.googleId);
        if(isPresent.length==0){
            res.status(200).send('Please Register Yourself Via Signup');
        }else{
            const spe=await StoreGoogleW.find({username:req.body.googleId}).limit(1);
                if(spe[0]==undefined){
                    res.status(200).send(isPresent[0]);
                }else{
                     let yt={};
                     yt.username=isPresent[0].username;
                     yt.name=isPresent[0].name;
                     yt.Phone=spe[0].Phone;//yt.Password=spe[0].Password;
                     yt.Address=spe[0].Address;
                    
                    res.status(200).send(yt);
                } 
        }
   }catch(err){
        res.status(400).send('error occured');
   }
});

module.exports=route;