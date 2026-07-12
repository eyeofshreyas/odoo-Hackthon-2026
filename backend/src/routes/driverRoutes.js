const express = require('express');
const { protect } = require('../middleware/auth');
const { allowRoles } = require('../middleware/rbac');
const asyncHandler = require('../utils/asyncHandler');
const {
  createDriver,
  listDrivers,
  updateDriver,
  deleteDriver,
} = require('../controllers/driverController');

const router = express.Router();

router.use(protect);
router.get('/', asyncHandler(listDrivers));
router.post('/', allowRoles('Fleet Manager', 'Safety Officer'), asyncHandler(createDriver));
router.put('/:id', allowRoles('Fleet Manager', 'Safety Officer'), asyncHandler(updateDriver));
router.delete('/:id', allowRoles('Fleet Manager'), asyncHandler(deleteDriver));

module.exports = router;
