const { assertCanClose } = require('../controllers/maintenanceController');

test('closing an already-closed maintenance record throws', () => {
  expect(() => assertCanClose({ status: 'Completed' })).toThrow('Maintenance record already closed');
});

test('closing an active maintenance record does not throw', () => {
  expect(() => assertCanClose({ status: 'Active' })).not.toThrow();
});
