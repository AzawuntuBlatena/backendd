const express=require('express');
const router=express.Router();
const {protect,isAdmin}=require('../middleware/authMiddelware');
const { createAdminNews, getAdminNews } = require('../controllers/adminnews');
const upload = require('../middleware/upload');
router.post('/',upload.single('img'),createAdminNews)
router.get('/',protect,getAdminNews)
// router.get('/',protect,isAdmin,getAdminNews)
// router.put('/',updateNews)
// router.delete('/',deleteNews)
module.exports=router;