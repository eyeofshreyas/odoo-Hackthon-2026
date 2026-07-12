const Vehicle = require('../models/Vehicle');
const { success, error } = require('../utils/apiResponse');

function canDispatchVehicle(vehicle) {
  return vehicle.status !== 'Retired' && vehicle.status !== 'In Shop' && vehicle.status !== 'On Trip';
}

const EDITABLE_VEHICLE_FIELDS = ['vehicleName', 'model', 'type', 'region', 'maxLoadCapacity', 'odometer', 'acquisitionCost'];

async function createVehicle(req, res) {
  const { registrationNumber, vehicleName, model, type, region, maxLoadCapacity, odometer, acquisitionCost } = req.body;
  if (!registrationNumber || !vehicleName || !model || !type || !region || maxLoadCapacity == null || odometer == null || acquisitionCost == null) {
    return error(res, 'registrationNumber, vehicleName, model, type, region, maxLoadCapacity, odometer, acquisitionCost are required');
  }

  const existing = await Vehicle.findOne({ registrationNumber });
  if (existing) return error(res, 'Vehicle already exists');

  const vehicle = await Vehicle.create({
    registrationNumber, vehicleName, model, type, region, maxLoadCapacity, odometer, acquisitionCost,
  });
  return success(res, 'Vehicle created successfully', vehicle, 201);
}

async function listVehicles(req, res) {
  const { status, search } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (search) filter.registrationNumber = { $regex: search, $options: 'i' };

  const vehicles = await Vehicle.find(filter).sort({ createdAt: -1 });
  return success(res, 'Vehicles fetched', vehicles);
}

async function updateVehicle(req, res) {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) return error(res, 'Vehicle not found', 404);

  EDITABLE_VEHICLE_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) vehicle[field] = req.body[field];
  });
  await vehicle.save();
  return success(res, 'Vehicle updated successfully', vehicle);
}

async function deleteVehicle(req, res) {
  const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
  if (!vehicle) return error(res, 'Vehicle not found', 404);
  return success(res, 'Vehicle deleted successfully', {});
}

module.exports = { createVehicle, listVehicles, updateVehicle, deleteVehicle, canDispatchVehicle };
