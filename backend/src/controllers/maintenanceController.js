const MaintenanceLog = require('../models/MaintenanceLog');
const Vehicle = require('../models/Vehicle');
const { success, error } = require('../utils/apiResponse');

function assertCanClose(log) {
  if (log.status === 'Completed') throw new Error('Maintenance record already closed');
}

async function createMaintenance(req, res) {
  const { vehicleId, maintenanceType, cost, startDate, description, assignedTechnician } = req.body;
  if (!vehicleId || !maintenanceType || cost == null || !startDate) {
    return error(res, 'vehicleId, maintenanceType, cost, startDate are required');
  }

  const claimedVehicle = await Vehicle.findOneAndUpdate(
    { _id: vehicleId, status: 'Available' },
    { status: 'In Shop' }
  );
  if (!claimedVehicle) return error(res, 'Vehicle is not available for maintenance');

  let log;
  try {
    log = await MaintenanceLog.create({ vehicleId, maintenanceType, cost, startDate, description, assignedTechnician });
  } catch (e) {
    await Vehicle.findByIdAndUpdate(vehicleId, { status: 'Available' });
    throw e;
  }

  return success(res, 'Maintenance record created successfully', log, 201);
}

async function listMaintenance(req, res) {
  const logs = await MaintenanceLog.find().populate('vehicleId').sort({ createdAt: -1 });
  return success(res, 'Maintenance records fetched', logs);
}

async function closeMaintenance(req, res) {
  const log = await MaintenanceLog.findById(req.params.id);
  if (!log) return error(res, 'Maintenance record not found', 404);

  try {
    assertCanClose(log);
  } catch (e) {
    return error(res, e.message);
  }

  log.status = 'Completed';
  log.endDate = new Date();
  await log.save();

  await Vehicle.findByIdAndUpdate(log.vehicleId, { status: 'Available' });

  return success(res, 'Maintenance closed successfully', log);
}

module.exports = { createMaintenance, listMaintenance, closeMaintenance, assertCanClose };
