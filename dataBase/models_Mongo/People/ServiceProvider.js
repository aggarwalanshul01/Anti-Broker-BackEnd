const {AuthService,AuthServiceGoogle} = require('../../schema_Mongo/AuthSchema');
const mongoose=require('mongoose');
//console.log(AuthService);
const ServiceProvider=new mongoose.model('ServiceProvider',AuthService);
const ServiceProviderGoogle=new mongoose.model('GServiceProvider',AuthServiceGoogle);

module.exports={ServiceProvider,ServiceProviderGoogle};