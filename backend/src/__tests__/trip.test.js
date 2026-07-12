const { assertDispatchable } = require('../controllers/tripController');

const availableVehicle = { status: 'Available', maxLoadCapacity: 1000 };
const availableDriver = { status: 'Available', licenseExpiryDate: '2099-01-01' };

test('dispatch succeeds when vehicle and driver are available and cargo fits', () => {
  expect(() => assertDispatchable({ vehicle: availableVehicle, driver: availableDriver, cargoWeight: 500 })).not.toThrow();
});

test('dispatch fails when cargo exceeds vehicle capacity', () => {
  expect(() => assertDispatchable({ vehicle: availableVehicle, driver: availableDriver, cargoWeight: 1500 }))
    .toThrow('Cargo weight exceeds vehicle capacity');
});

test('dispatch fails when vehicle already on trip', () => {
  expect(() => assertDispatchable({ vehicle: { ...availableVehicle, status: 'On Trip' }, driver: availableDriver, cargoWeight: 100 }))
    .toThrow('Vehicle is not available for dispatch');
});

test('dispatch fails when driver suspended', () => {
  expect(() => assertDispatchable({ vehicle: availableVehicle, driver: { ...availableDriver, status: 'Suspended' }, cargoWeight: 100 }))
    .toThrow('Driver is not available for assignment');
});
