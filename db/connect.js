const mongoose = require('mongoose');

const connectToDb=()=>{
  mongoose.connect(process.env.MONGOURL).then(console.log('connected to db'))
}

module.exports=connectToDb;