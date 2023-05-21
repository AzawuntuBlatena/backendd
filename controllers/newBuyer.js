const asyncHandler = require('express-async-handler');
const buyers=require('../model/buyshare');
const bcrypt=require('bcryptjs');
const  mongoose = require('mongoose');
const getNewBuyer=asyncHandler(async (req,res)=>{
    const user=await buyers.find();
    res.json(user);
})
const getBuyerById=asyncHandler(async (req,res)=>{
  const {id}=req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'no new buyer found'})
      }
      const share=await buyers.findById({_id:id});
      if(share){
       res.json(share);
      }
})
const createNew=asyncHandler(async(req,res)=>{
    const {firstname,middlename,lastname,country,email,city,subcity,wereda,houseNo,phoneNo,shareamount,paidbirr}=req.body;
    if( !firstname || !middlename || !lastname  || !country ||!email || !city || !subcity || !paidbirr|| !wereda || !houseNo || !phoneNo || !shareamount){
      res.status(404);
      throw new Error("please fill all filed");
    }
  const userExist=await buyers.findOne({email});
  if(userExist){
    res.status(404);
    throw new Error("user already exists change your email");
  }
  // const salt=await bcrypt.genSalt(10);
  // const hashedPassword=await bcrypt.hash(password,salt);
  const share=await buyers.create({
    firstname,
    middlename,
    lastname,
    email,
    // password:hashedPassword,
    country,
    city,
    subcity,
    wereda,
    houseNo,
    phoneNo,
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

  // const salt=await bcrypt.genSalt(10);
  // const hashedPassword=await bcrypt.hash(password,salt);
  // let share=new buyers({
  //   firstname:req.body.firstname,
  //   middlename:req.body.middlename,
  //   lastname:req.body.lastname,
  //   email:req.body.email,
  //   // password:hashedPassword,
  //   country:req.body.country,
  //   city:req.body.city,
  //   subcity:req.body.subcity,
  //   wereda:req.body.wereda,
  //   houseNo:req.body.houseNo,
  //   phoneNo:req.body.phoneNo,
  //   shareamount:req.body.shareamount,
  //   paidbirr:req.body.paidbirr
  // })
  // share.save().then(async(response)=>{
  //   res.json({
  //     message:"saved"
  //   })
  // }).catch(error=>{
  //   res.json({
  //     message:"error"
  //   })
  // })
  // if(share){
  //     await sendEmail(share.email, "use this password to login and update by your own", `password:${password}`);
  //   res.send("An Email sent to your account please verify");
  // }
})

// })
  
module.exports={
 getNewBuyer,
 createNew,
 getBuyerById,   
}