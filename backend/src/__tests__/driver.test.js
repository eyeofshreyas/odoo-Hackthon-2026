const { canAssignDriver } = require('../controllers/driverController');

test('suspended driver cannot be assigned', () => {
  expect(canAssignDriver({ status: 'Suspended', licenseExpiryDate: '2099-01-01' })).toBe(false);
});

test('driver on trip cannot be assigned', () => {
  expect(canAssignDriver({ status: 'On Trip', licenseExpiryDate: '2099-01-01' })).toBe(false);
});

test('driver with expired license cannot be assigned', () => {
  expect(canAssignDriver({ status: 'Available', licenseExpiryDate: '2000-01-01' })).toBe(false);
});

test('available driver with valid license can be assigned', () => {
  expect(canAssignDriver({ status: 'Available', licenseExpiryDate: '2099-01-01' })).toBe(true);
});
