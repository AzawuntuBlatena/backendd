const asyncHandler = require('express-async-handler');
const bcrypt=require('bcryptjs');
const AdminNews = require('../model/adminNews');
const createAdminNews=asyncHandler(async(req,res)=>{
  const {title,content,author,description}=req.body;
  if(!title || !content || !description || !author){
    res.status(404);
    throw new Error("please fill news");
  }
    let admin=new AdminNews({
      title:"eyob",
      content:"eyob",
      description:"eyob",
      author:"eyob",
    })
    console.log(req.file)
    if(req.file){
      admin.img=req.file.path
      console.log(req.file.path)
    }
    admin.save().then(response=>{
      res.json({
        message:"saved"
      })
    })
    .catch(error=>{
      res.json({
        message:error.message
      })
    })
})
    
const getAdminNews=asyncHandler(async(req,res)=>{
  const news=await AdminNews.find();
  if(!news){
    res.status(500)
    throw new Error('cannot fetch a news')
  }
  res.status(200).json(news);
})
module.exports={
    createAdminNews,
    getAdminNews,
}

