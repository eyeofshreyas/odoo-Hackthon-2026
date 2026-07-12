const express = require('express');
const { protect } = require('../middleware/auth');
const { allowRoles } = require('../middleware/rbac');
const asyncHandler = require('../utils/asyncHandler');
const {
  createTrip,
  listTrips,
  dispatchTrip,
  completeTrip,
  cancelTrip,
} = require('../controllers/tripController');

const router = express.Router();

router.use(protect);
router.get('/', asyncHandler(listTrips));
router.post('/', allowRoles('Fleet Manager'), asyncHandler(createTrip));
router.patch('/:id/dispatch', allowRoles('Fleet Manager'), asyncHandler(dispatchTrip));
router.patch('/:id/complete', allowRoles('Fleet Manager', 'Driver'), asyncHandler(completeTrip));
router.patch('/:id/cancel', allowRoles('Fleet Manager'), asyncHandler(cancelTrip));

module.exports = router;
