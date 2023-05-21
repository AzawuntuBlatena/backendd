const express = require('express');
const { calculateDividends } = require('../controllers/sharedividend');
const { isAdmin } = require('../middleware/authMiddelware');
// const { calculateDividends } = require('../controllers/dividendController');

const router = express.Router();

router.post('/',calculateDividends);

module.exports = router;