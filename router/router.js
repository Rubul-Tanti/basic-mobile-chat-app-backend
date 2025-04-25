const express=require('express')
const user=require('../db/userSchema')
const router=express.Router()
router.post('/createaccount',async(req,res)=>{
  try{
    const username=req.body.username
if(username){
  const newuser=username
  if(newuser){
    console.log(username)
    
    res.status(200).json({message:"user created",success:true,data:newuser})
  }else{
    res.status(400).json({message:"user not created",success:false})
  }
}else{
  res.status(400).json({message:"user not created",success:false})
}

  }
  catch(e){console.error(e)}
})
module.exports=router