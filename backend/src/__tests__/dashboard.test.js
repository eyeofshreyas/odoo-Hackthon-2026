const { computeFleetUtilization } = require('../controllers/dashboardController');

test('utilization is 0 when there are no vehicles', () => {
  expect(computeFleetUtilization(0, 0)).toBe(0);
});

test('utilization is a percentage rounded to 2 decimals', () => {
  expect(computeFleetUtilization(3, 1)).toBe(33.33);
});
