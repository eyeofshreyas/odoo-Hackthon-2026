const Expense = require('../models/Expense');
const { success, error } = require('../utils/apiResponse');

const EXPENSE_CATEGORIES = ['Repair', 'Toll', 'Insurance', 'Parking', 'Other'];

async function createExpense(req, res) {
  const { vehicleId, expenseCategory, amount, date, tripId, description } = req.body;
  if (!vehicleId || !expenseCategory || amount == null || !date) {
    return error(res, 'vehicleId, expenseCategory, amount, date are required');
  }
  if (!EXPENSE_CATEGORIES.includes(expenseCategory)) {
    return error(res, `expenseCategory must be one of: ${EXPENSE_CATEGORIES.join(', ')}`);
  }

  const expense = await Expense.create({ vehicleId, expenseCategory, amount, date, tripId, description });
  return success(res, 'Expense created successfully', expense, 201);
}

async function listExpenses(req, res) {
  const { vehicleId, expenseCategory } = req.query;
  const filter = {};
  if (vehicleId) filter.vehicleId = vehicleId;
  if (expenseCategory) filter.expenseCategory = expenseCategory;

  const expenses = await Expense.find(filter).sort({ date: -1 });
  return success(res, 'Expenses fetched', expenses);
}

module.exports = { createExpense, listExpenses };
