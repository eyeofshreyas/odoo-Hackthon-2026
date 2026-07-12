const express = require('express');
const { protect } = require('../middleware/auth');
const { allowRoles } = require('../middleware/rbac');
const asyncHandler = require('../utils/asyncHandler');
const { createExpense, listExpenses } = require('../controllers/expenseController');

const router = express.Router();
router.use(protect);
router.get('/', asyncHandler(listExpenses));
router.post('/', allowRoles('Fleet Manager', 'Financial Analyst'), asyncHandler(createExpense));

module.exports = router;
