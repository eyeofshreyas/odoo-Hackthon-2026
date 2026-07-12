const express = require('express');
const { protect } = require('../middleware/auth');
const { allowRoles } = require('../middleware/rbac');
const asyncHandler = require('../utils/asyncHandler');
const {
  createVehicle,
  listVehicles,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicleController');

const router = express.Router();

router.use(protect);
router.get('/', asyncHandler(listVehicles));
router.post('/', allowRoles('Fleet Manager'), asyncHandler(createVehicle));
router.put('/:id', allowRoles('Fleet Manager'), asyncHandler(updateVehicle));
router.delete('/:id', allowRoles('Fleet Manager'), asyncHandler(deleteVehicle));

module.exports = router;
