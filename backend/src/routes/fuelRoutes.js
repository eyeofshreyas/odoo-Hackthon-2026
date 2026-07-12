const express = require('express');
const { protect } = require('../middleware/auth');
const { allowRoles } = require('../middleware/rbac');
const asyncHandler = require('../utils/asyncHandler');
const { createFuelLog, listFuelLogs } = require('../controllers/fuelController');

const router = express.Router();
router.use(protect);
router.get('/', asyncHandler(listFuelLogs));
router.post('/', allowRoles('Fleet Manager', 'Financial Analyst'), asyncHandler(createFuelLog));

module.exports = router;
