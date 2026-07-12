const { canDispatchVehicle } = require('../controllers/vehicleController');

test.each([
  ['Available', true],
  ['On Trip', false],
  ['In Shop', false],
  ['Retired', false],
])('vehicle with status %s → dispatchable = %s', (status, expected) => {
  expect(canDispatchVehicle({ status })).toBe(expected);
});
