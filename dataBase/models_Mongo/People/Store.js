const {AuthService,AuthServiceGoogle} = require('../../schema_Mongo/AuthSchema');
const mongoose=require('mongoose');
//console.log(AuthService);
const Store=new mongoose.model('Store',AuthService);
const StoreGoogle=new mongoose.model('GStore',AuthServiceGoogle);

module.exports={Store,StoreGoogle};