const {AuthService,AuthServiceGoogle,Store_Work_Google} = require('../../schema_Mongo/Store_Schema');
const mongoose=require('mongoose');
//console.log(AuthService);
const Store=new mongoose.model('Store',AuthService);
const StoreGoogle=new mongoose.model('GStore',AuthServiceGoogle);
const StoreGoogleW=new mongoose.model('GWStore',Store_Work_Google);

module.exports={Store,StoreGoogle,StoreGoogleW};