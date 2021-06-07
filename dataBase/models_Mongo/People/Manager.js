const {AuthService,AuthServiceGoogle,Manager_Work_Google} = require('../../schema_Mongo/Manager');
const mongoose=require('mongoose');
//console.log(AuthService);
const Manager=new mongoose.model('Manager',AuthService);
const ManagerGoogle=new mongoose.model('GManager',AuthServiceGoogle);
const ManagerGoogleWork=new mongoose.model('GManagerWork',Manager_Work_Google);


module.exports={Manager,ManagerGoogle,ManagerGoogleWork};