const asyncHandler = require('express-async-handler');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const Shareholders=require('../model/share');
const LoginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password ){
      res.status(404);
      throw new Error('can not create');
    }
    const userExist=await Shareholders.findOne({email});
    if(userExist && (await bcrypt.compare(password,userExist.password))){
      res.status(201).json({
        _id:userExist.id,
        email:userExist.email,
        firstname:userExist.firstname,
        roll:userExist.roll,
        token:generateToken(userExist._id),
        // ok:"userloged"
      })
    }
      else {
        res.status(400).json({error:'Invalid Credentials'})
       }
  }
  )
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    })
  }
  module.exports={
    LoginUser,
    generateToken
  }