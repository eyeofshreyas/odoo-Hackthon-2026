const express = require('express');
const { protect } = require('../middleware/auth');
const asyncHandler = require('../utils/asyncHandler');
const { getDashboard } = require('../controllers/dashboardController');

const router = express.Router();
router.use(protect);
router.get('/', asyncHandler(getDashboard));

module.exports = router;
