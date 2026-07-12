const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const { canDispatchVehicle } = require('./vehicleController');
const { canAssignDriver } = require('./driverController');
const { success, error } = require('../utils/apiResponse');

const COMPLETION_FIELDS = ['actualDistance', 'startOdometer', 'endOdometer', 'fuelConsumed', 'revenue', 'completionNotes'];

function assertDispatchable({ vehicle, driver, cargoWeight }) {
  if (!canDispatchVehicle(vehicle)) throw new Error('Vehicle is not available for dispatch');
  if (!canAssignDriver(driver)) throw new Error('Driver is not available for assignment');
  if (cargoWeight > vehicle.maxLoadCapacity) throw new Error('Cargo weight exceeds vehicle capacity');
}

async function createTrip(req, res) {
  const { source, destination, vehicleId, driverId, cargoWeight, plannedDistance } = req.body;
  if (!source || !destination || !vehicleId || !driverId || cargoWeight == null || plannedDistance == null) {
    return error(res, 'source, destination, vehicleId, driverId, cargoWeight, plannedDistance are required');
  }

  const trip = await Trip.create({ source, destination, vehicleId, driverId, cargoWeight, plannedDistance });
  return success(res, 'Trip created successfully', trip, 201);
}

async function listTrips(req, res) {
  const { status } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const trips = await Trip.find(filter).populate('vehicleId driverId').sort({ createdAt: -1 });
  return success(res, 'Trips fetched', trips);
}

async function dispatchTrip(req, res) {
  const trip = await Trip.findById(req.params.id).populate('vehicleId driverId');
  if (!trip) return error(res, 'Trip not found', 404);
  if (trip.status !== 'Draft') return error(res, 'Only draft trips can be dispatched');

  try {
    assertDispatchable({ vehicle: trip.vehicleId, driver: trip.driverId, cargoWeight: trip.cargoWeight });
  } catch (e) {
    return error(res, e.message);
  }

  const claimedVehicle = await Vehicle.findOneAndUpdate(
    { _id: trip.vehicleId._id, status: 'Available' },
    { status: 'On Trip' }
  );
  if (!claimedVehicle) return error(res, 'Vehicle is not available for dispatch');

  const claimedDriver = await Driver.findOneAndUpdate(
    { _id: trip.driverId._id, status: 'Available', licenseExpiryDate: { $gte: new Date() } },
    { status: 'On Trip' }
  );
  if (!claimedDriver) {
    await Vehicle.findByIdAndUpdate(trip.vehicleId._id, { status: 'Available' });
    return error(res, 'Driver is not available for assignment');
  }

  trip.status = 'Dispatched';
  trip.startTime = new Date();
  await trip.save();

  return success(res, 'Trip dispatched successfully', trip);
}

async function completeTrip(req, res) {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return error(res, 'Trip not found', 404);
  if (trip.status !== 'Dispatched') return error(res, 'Only dispatched trips can be completed');

  COMPLETION_FIELDS.forEach((field) => {
    if (req.body[field] !== undefined) trip[field] = req.body[field];
  });
  trip.status = 'Completed';
  trip.endTime = new Date();
  await trip.save();

  await Vehicle.findByIdAndUpdate(trip.vehicleId, { status: 'Available' });
  await Driver.findByIdAndUpdate(trip.driverId, { status: 'Available' });

  return success(res, 'Trip completed successfully', trip);
}

async function cancelTrip(req, res) {
  const trip = await Trip.findById(req.params.id);
  if (!trip) return error(res, 'Trip not found', 404);
  if (trip.status !== 'Dispatched' && trip.status !== 'Draft') {
    return error(res, 'Only draft or dispatched trips can be cancelled');
  }

  const wasDispatched = trip.status === 'Dispatched';
  trip.status = 'Cancelled';
  await trip.save();

  if (wasDispatched) {
    await Vehicle.findByIdAndUpdate(trip.vehicleId, { status: 'Available' });
    await Driver.findByIdAndUpdate(trip.driverId, { status: 'Available' });
  }

  return success(res, 'Trip cancelled successfully', trip);
}

module.exports = { createTrip, listTrips, dispatchTrip, completeTrip, cancelTrip, assertDispatchable };
