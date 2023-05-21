const asyncHandler = require('express-async-handler');
const oldshareholder = require('../model/shareamount');
const { default: mongoose } = require('mongoose');
const createShare=asyncHandler(async(req,res)=>{
  const {firstname,email,shareamount,paidbirr,lastname,middlename}=req.body;
  if(!firstname || !middlename || !lastname || !paidbirr || !email || !shareamount){
    res.status(404);
    throw new Error("please fill all fields");
  }
  const share=await oldshareholder.create({
    firstname,
    middlename,
    lastname,
    email,
    shareamount,
    paidbirr
});
if(share){
  res.status(201).json({
    _id:share.id,
    email:share.email,
    // password:hashedPassword,
  });

}
  else{
    res.status(400);
    throw new Error("can not create");
  }
})
const getoldshareholders=asyncHandler(async(req,res)=>{
  const share=await oldshareholder.find();
  if(!share){
    res.status(500)
    throw new Error('cannot fetch a shareholder')
  }
  res.status(200).json(share);
})
const getShareholderById=asyncHandler(async (req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no new buyer found'})
      }
      const share=await oldshareholder.findById({_id:id});
      if(share){
       res.json(share);
      }
})
module.exports={
    createShare,
    getoldshareholders,
    getShareholderById
}

