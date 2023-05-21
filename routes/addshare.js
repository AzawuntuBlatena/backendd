const express=require('express');
const router=express.Router();
const {protect}=require('../middleware/authMiddelware');
const upload = require('../middleware/upload');
const { createShare, getoldshareholders, getShareholderById } = require('../controllers/addshare');
const { getShareById } = require('../controllers/shareInfo');
router.get('/',getoldshareholders);
router.get('/edit_shareholder/:id',getShareholderById);
router.post('/',createShare);
// router.put('/:id',updateShare);
// router.delete('/:id',deleteShare);
module.exports=router;
