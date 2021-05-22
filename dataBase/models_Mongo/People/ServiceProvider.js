const {AuthService,AuthServiceGoogle} = require('../../schema_Mongo/AuthSchema');
const {Service_Work,Service_Work_Google} = require('../../schema_Mongo/Service_Provider_Schema');
const mongoose=require('mongoose');
//console.log(AuthService);
const ServiceProvider=new mongoose.model('ServiceProvider',AuthService);
const ServiceProviderGoogle=new mongoose.model('GServiceProvider',AuthServiceGoogle);
const ServiceWork=new mongoose.model('ServiceWork',Service_Work);
const ServiceWorkG=new mongoose.model('GService_Work',Service_Work_Google);

module.exports={ServiceProvider,ServiceProviderGoogle,ServiceWork,ServiceWorkG};