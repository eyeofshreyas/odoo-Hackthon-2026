const express = require('express');
const { protect } = require('../middleware/auth');
const { allowRoles } = require('../middleware/rbac');
const asyncHandler = require('../utils/asyncHandler');
const {
  createMaintenance,
  listMaintenance,
  closeMaintenance,
} = require('../controllers/maintenanceController');

const router = express.Router();

router.use(protect);
router.get('/', asyncHandler(listMaintenance));
router.post('/', allowRoles('Fleet Manager', 'Safety Officer'), asyncHandler(createMaintenance));
router.patch('/:id/close', allowRoles('Fleet Manager', 'Safety Officer'), asyncHandler(closeMaintenance));

module.exports = router;
