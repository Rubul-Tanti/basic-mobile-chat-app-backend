const mongoose = require('mongoose');
const Schema = mongoose.Schema({
  username:{type:String,required:true,
  }
});
const userModel=mongoose.model('user',Schema)
module.exports=userModel