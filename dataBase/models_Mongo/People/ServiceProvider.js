const {AuthService} = require('../../schema_Mongo/AuthSchema');
const mongoose=require('mongoose');
//console.log(AuthService);
const ServiceProvider=new mongoose.model('ServiceProvider',AuthService);

module.exports=ServiceProvider;