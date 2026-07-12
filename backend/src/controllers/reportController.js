const Vehicle = require('../models/Vehicle');
const Trip = require('../models/Trip');
const FuelLog = require('../models/FuelLog');
const Expense = require('../models/Expense');
const MaintenanceLog = require('../models/MaintenanceLog');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const { success } = require('../utils/apiResponse');

function computeFuelEfficiency(totalKm, totalLiters) {
  if (totalLiters === 0) return 0;
  return Number((totalKm / totalLiters).toFixed(2));
}

function computeOperationalCost(fuelCost, maintenanceCost, expenseCost) {
  return Number((fuelCost + maintenanceCost + expenseCost).toFixed(2));
}

function computeVehicleROI(revenue, totalCost) {
  if (totalCost === 0) return 0;
  return Number((((revenue - totalCost) / totalCost) * 100).toFixed(2));
}

async function buildReportRows() {
  const vehicles = await Vehicle.find();

  return Promise.all(
    vehicles.map(async (vehicle) => {
      const [fuelLogs, expenses, maintenanceLogs, completedTrips] = await Promise.all([
        FuelLog.find({ vehicleId: vehicle._id }),
        Expense.find({ vehicleId: vehicle._id }),
        MaintenanceLog.find({ vehicleId: vehicle._id }),
        Trip.find({ vehicleId: vehicle._id, status: 'Completed' }),
      ]);

      const totalLiters = fuelLogs.reduce((sum, f) => sum + f.liters, 0);
      const fuelCost = fuelLogs.reduce((sum, f) => sum + f.cost, 0);
      const maintenanceCost = maintenanceLogs.reduce((sum, m) => sum + m.cost, 0);
      const expenseCost = expenses.reduce((sum, e) => sum + e.amount, 0);
      const totalKm = completedTrips.reduce((sum, t) => sum + (t.actualDistance || 0), 0);
      const revenue = completedTrips.reduce((sum, t) => sum + (t.revenue || 0), 0);

      const operationalCost = computeOperationalCost(fuelCost, maintenanceCost, expenseCost);

      return {
        registrationNumber: vehicle.registrationNumber,
        fuelEfficiencyKmPerLiter: computeFuelEfficiency(totalKm, totalLiters),
        operationalCost,
        vehicleROI: computeVehicleROI(revenue, operationalCost),
      };
    })
  );
}

async function getReports(req, res) {
  const rows = await buildReportRows();
  return success(res, 'Reports fetched', rows);
}

async function exportCSV(req, res) {
  const rows = await buildReportRows();
  const parser = new Parser();
  const csv = parser.parse(rows);

  res.header('Content-Type', 'text/csv');
  res.attachment('transitops-report.csv');
  return res.send(csv);
}

async function exportPDF(req, res) {
  const rows = await buildReportRows();
  const doc = new PDFDocument();

  res.header('Content-Type', 'application/pdf');
  res.attachment('transitops-report.pdf');
  doc.pipe(res);

  doc.fontSize(16).text('TransitOps Fleet Report', { align: 'center' });
  doc.moveDown();
  rows.forEach((row) => {
    doc.fontSize(11).text(
      `${row.registrationNumber} — Efficiency: ${row.fuelEfficiencyKmPerLiter} km/L, ` +
      `Cost: ${row.operationalCost}, ROI: ${row.vehicleROI}%`
    );
  });

  doc.end();
}

module.exports = {
  getReports,
  exportCSV,
  exportPDF,
  computeFuelEfficiency,
  computeOperationalCost,
  computeVehicleROI,
};
