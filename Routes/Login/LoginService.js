const route=require('express').Router();
const {ServiceProvider,ServiceProviderGoogle,ServiceWork,ServiceWorkG}=require('../../dataBase/models_Mongo/People/ServiceProvider');


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
                let pp=isPresent[0];
                const spe=await ServiceWork.find({username:req.body.username}).limit(1);
                console.log(spe);
                if(spe[0]==''){
                    res.status(200).send(isPresent[0]);
                }else{
                    //pp.specialization=spe[0].profession;
                    //pp={...pp,[specialization]:[spe[0].profession]};
                    //pp.specialization='kjhgf';
                    //console.log("--- ",pp);
                    let yt={};
                    yt.username=pp.username;
                    yt.name=pp.name;
                    yt.Age=pp.Age;
                    yt.Phone=pp.Phone;yt.Gender=pp.Gender;yt.Password=pp.Password;
                    yt.Description=pp.Description;
                    yt.specialization=spe[0].profession;
                    //console.log(yt);
                    //console.log(isPresent[0]);
                    res.status(200).send(yt);
                }
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
            
            //console.log(req.body);
            const spe=await ServiceWorkG.find({username:req.body.googleId}).limit(1);
                //console.log(spe);
                if(spe[0]==undefined){
                    //console.log("*****");
                    res.status(200).send(isPresent[0]);
                }else{
                    //pp.specialization=spe[0].profession;
                    //pp={...pp,[specialization]:[spe[0].profession]};
                    //pp.specialization='kjhgf';
                    //console.log("--- ",pp);
                     let yt={};
                     yt.username=isPresent[0].username;
                     yt.name=isPresent[0].name;
                     yt.Age=spe[0].Age;
                     yt.Phone=spe[0].Phone;yt.Gender=spe[0].Gender;//yt.Password=spe[0].Password;
                     yt.Description=spe[0].Description;
                     yt.specialization=spe[0].profession;
                    //console.log(yt);
                    //console.log(isPresent[0]);
                    //console.log(isPresent[0]);
                    //console.log(spe[0]);
                    res.status(200).send(yt);
                }
        }
   }catch(err){
        res.status(400).send('error occured');
   }
});

module.exports=route;