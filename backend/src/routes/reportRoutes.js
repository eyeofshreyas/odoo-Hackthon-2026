const express = require('express');
const { protect } = require('../middleware/auth');
const { allowRoles } = require('../middleware/rbac');
const asyncHandler = require('../utils/asyncHandler');
const { getReports, exportCSV, exportPDF } = require('../controllers/reportController');

const router = express.Router();
router.use(protect, allowRoles('Fleet Manager', 'Financial Analyst'));
router.get('/', asyncHandler(getReports));
router.get('/export/csv', asyncHandler(exportCSV));
router.get('/export/pdf', asyncHandler(exportPDF));

module.exports = router;
