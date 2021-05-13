const route=require('express').Router();
const ServiceProvider=require('../dataBase/models_Mongo/People/ServiceProvider');

route.post('/',async(req,res)=>{
    const provider=new ServiceProvider({
        username:'gssfsssdasdfgserthj',
        name:'aggarwalanshul01',
        Age:'23',
        Phone:'9999999999',
        Gender:'male',
        Password:'aaaa',
        Description:'sadfsdgfhgjyrterea'
    });
    let result=await provider.save();
});