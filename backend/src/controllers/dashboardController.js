const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Trip = require('../models/Trip');
const { success } = require('../utils/apiResponse');

function computeFleetUtilization(totalVehicles, onTripVehicles) {
  if (totalVehicles === 0) return 0;
  return Number(((onTripVehicles / totalVehicles) * 100).toFixed(2));
}

async function getDashboard(req, res) {
  const [totalVehicles, availableVehicles, inShopVehicles, onTripVehicles] = await Promise.all([
    Vehicle.countDocuments(),
    Vehicle.countDocuments({ status: 'Available' }),
    Vehicle.countDocuments({ status: 'In Shop' }),
    Vehicle.countDocuments({ status: 'On Trip' }),
  ]);

  const [activeTrips, pendingTrips, driversOnDuty] = await Promise.all([
    Trip.countDocuments({ status: 'Dispatched' }),
    Trip.countDocuments({ status: 'Draft' }),
    Driver.countDocuments({ status: 'On Trip' }),
  ]);

  const data = {
    activeVehicles: onTripVehicles,
    availableVehicles,
    vehiclesInMaintenance: inShopVehicles,
    activeTrips,
    pendingTrips,
    driversOnDuty,
    fleetUtilization: computeFleetUtilization(totalVehicles, onTripVehicles),
  };

  return success(res, 'Dashboard data fetched', data);
}

module.exports = { getDashboard, computeFleetUtilization };
