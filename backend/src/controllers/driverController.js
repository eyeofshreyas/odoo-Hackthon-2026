const Driver = require('../models/Driver');
const { success, error } = require('../utils/apiResponse');

function canAssignDriver(driver) {
  if (driver.status === 'Suspended' || driver.status === 'On Trip') return false;
  if (new Date(driver.licenseExpiryDate) < new Date()) return false;
  return true;
}

async function createDriver(req, res) {
  const { name, licenseNumber, licenseCategory, licenseExpiryDate, contactNumber, safetyScore } = req.body;
  if (!name || !licenseNumber || !licenseCategory || !licenseExpiryDate || !contactNumber || safetyScore == null) {
    return error(res, 'name, licenseNumber, licenseCategory, licenseExpiryDate, contactNumber, safetyScore are required');
  }

  const existing = await Driver.findOne({ licenseNumber });
  if (existing) return error(res, 'Driver already exists');

  const driver = await Driver.create({
    name, licenseNumber, licenseCategory, licenseExpiryDate, contactNumber, safetyScore,
  });
  return success(res, 'Driver created successfully', driver, 201);
}

async function listDrivers(req, res) {
  const { status, search } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (search) filter.name = { $regex: search, $options: 'i' };

  const drivers = await Driver.find(filter).sort({ createdAt: -1 });
  return success(res, 'Drivers fetched', drivers);
}

const EDITABLE_DRIVER_FIELDS = ['name', 'licenseCategory', 'licenseExpiryDate', 'contactNumber', 'safetyScore'];

async function updateDriver(req, res) {
  const driver = await Driver.findById(req.params.id);
  if (!driver) return error(res, 'Driver not found', 404);

  EDITABLE_DRIVER_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) driver[field] = req.body[field];
  });
  await driver.save();
  return success(res, 'Driver updated successfully', driver);
}

async function deleteDriver(req, res) {
  const driver = await Driver.findByIdAndDelete(req.params.id);
  if (!driver) return error(res, 'Driver not found', 404);
  return success(res, 'Driver deleted successfully', {});
}

module.exports = { createDriver, listDrivers, updateDriver, deleteDriver, canAssignDriver };
