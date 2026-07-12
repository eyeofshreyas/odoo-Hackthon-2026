const FuelLog = require('../models/FuelLog');
const { success, error } = require('../utils/apiResponse');

async function createFuelLog(req, res) {
  const { vehicleId, liters, cost, date, tripId } = req.body;
  if (!vehicleId || liters == null || cost == null || !date) {
    return error(res, 'vehicleId, liters, cost, date are required');
  }

  const log = await FuelLog.create({ vehicleId, liters, cost, date, tripId });
  return success(res, 'Fuel log created successfully', log, 201);
}

async function listFuelLogs(req, res) {
  const { vehicleId } = req.query;
  const filter = vehicleId ? { vehicleId } : {};
  const logs = await FuelLog.find(filter).populate('vehicleId').sort({ date: -1 });
  return success(res, 'Fuel logs fetched', logs);
}

module.exports = { createFuelLog, listFuelLogs };
