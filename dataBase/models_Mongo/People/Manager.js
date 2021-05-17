const {AuthService,AuthServiceGoogle} = require('../../schema_Mongo/AuthSchema');
const mongoose=require('mongoose');
//console.log(AuthService);
const Manager=new mongoose.model('Manager',AuthService);
const ManagerGoogle=new mongoose.model('GManager',AuthServiceGoogle);

module.exports={Manager,ManagerGoogle};