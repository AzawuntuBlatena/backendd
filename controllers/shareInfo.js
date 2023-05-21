const asyncHandler = require('express-async-handler');
const bcrypt=require('bcryptjs');
// const jwt=require('jsonwebtoken');
const Shareholders=require('../model/share');
// const { generateToken } = require('./login');
const  mongoose = require('mongoose');
const sendEmail=require('../utils/email')
const getShare=asyncHandler(async (req,res)=>{
    const share=await Shareholders.find();
    res.json(share);
})
const getShareById=asyncHandler(async (req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no shareholder found'})
      }
      const share=await Shareholders.findById({_id:id});
      if(share){
       res.json(share);
      }
})
const createShare=asyncHandler(async(req,res)=>{
    const {firstname,middlename,lastname,country,email,password,city,subcity,wereda,houseNo,phoneNo,shareamount,paidbirr}=req.body;
    if( !firstname || !middlename || !lastname  || !country ||!email ||!password || !city || !subcity || !paidbirr|| !wereda || !houseNo || !phoneNo || !shareamount){
      res.status(404);
      throw new Error("please fill all filed");
    }
  const shareExists=await Shareholders.findOne({email});
  if(shareExists){
    res.status(404);
    throw new Error("'shareholder already exists'");
  }
  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(password,salt);
  let share=new Shareholders({
    firstname:req.body.firstname,
    middlename:req.body.middlename,
    lastname:req.body.lastname,
    email:req.body.email,
    password:hashedPassword,
    country:req.body.country,
    city:req.body.city,
    subcity:req.body.subcity,
    wereda:req.body.wereda,
    houseNo:req.body.houseNo,
    phoneNo:req.body.phoneNo,
    shareamount:req.body.shareamount,
    paidbirr:req.body.paidbirr
  })
  if(req.file){
    share.image=req.file.path
  }
  share.save().then(async(response)=>{
    res.json({
      message:"saved"
    })
   await sendEmail(share.email, "use this password to login and update by your own", `password:${password}`);
  }).catch(error=>{
    res.json({
      message:"error"
    })
  })
  // if(share){
  //     await sendEmail(share.email, "use this password to login and update by your own", `password:${password}`);
  //   res.send("An Email sent to your account please verify");
  // }
})

// })
//   const share=await Shareholders.create({
//       firstname,
//       middlename,
//       lastname,
//       email,
//       password:hashedPassword,
//       country,
//       city,
//       subcity,
//       wereda,
//       houseNo,
//       phoneNo,
//       shareamount,
//       paidbirr
//   });
//   if(share){
//     // res.status(201).json({
//     //   _id:share.id,
//     //   role:share.role,
//     //   email:share.email,
//     //   // token:generateToken(share._id),
//     // });
//     // await sendEmail(share.email, "use this password to login and update by your own", `password:${password}`);
//     res.send("An Email sent to your account please verify");
//   }
//     else{
//       res.status(400);
//       throw new Error("can not create");
//     }
// })
const updateShare=asyncHandler(async(req,res)=>{
    const {shareamount,paidbirr}=req.body;
    const {email}=req.params;
    // if(!mongoose.Types.ObjectId.isValid(id)){
    // res.status(404).json({error: 'no shareholder found'})
    //   }
    const shareExists=await Shareholders.findOne({email});
  if(!shareExists){
    res.status(404);
    throw new Error("'shareholder dosenot exists'");
  }
        if(!shareamount || !paidbirr){
          res.status(404);
          throw new Error("please add all filed ");
        }
       const share= await Shareholders.findOneAndUpdate({email},req.body);
          const oneshare=await Shareholders.findOne({email});
            res.json(oneshare);
})
const deleteShare=asyncHandler(async(req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no shareholder found'})
  }
  const shareholder = await Shareholders.findById(id)
  if (!shareholder) {
    res.status(400)
    throw new Error('shareholder not found');
  }
  await shareholder.deleteOne()
  res.status(200).json({ id:id })
})
module.exports={
    getShare,
    getShareById,
    createShare,
    updateShare,
    deleteShare
}