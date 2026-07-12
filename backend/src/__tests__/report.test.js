const {
  computeFuelEfficiency,
  computeOperationalCost,
  computeVehicleROI,
} = require('../controllers/reportController');

test('fuel efficiency is km per liter, rounded to 2 decimals', () => {
  expect(computeFuelEfficiency(300, 40)).toBe(7.5);
});

test('fuel efficiency is 0 when no fuel was logged', () => {
  expect(computeFuelEfficiency(0, 0)).toBe(0);
});

test('operational cost sums fuel, maintenance, and expenses', () => {
  expect(computeOperationalCost(100, 50, 25)).toBe(175);
});

test('ROI is 0 when total cost is 0', () => {
  expect(computeVehicleROI(500, 0)).toBe(0);
});

test('ROI is percentage gain over cost', () => {
  expect(computeVehicleROI(150, 100)).toBe(50);
});
