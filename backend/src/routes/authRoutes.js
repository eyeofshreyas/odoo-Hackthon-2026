const express = require('express');
const asyncHandler = require('../utils/asyncHandler');
const { protect } = require('../middleware/auth');
const { signup, login, getMe } = require('../controllers/authController');

const router = express.Router();
router.post('/signup', asyncHandler(signup));
router.post('/login', asyncHandler(login));
router.get('/me', protect, asyncHandler(getMe));

module.exports = router;
