/**
 * fuelExpense.service — thin pass-through to src/api/fuelExpense.js.
 * No extra shaping/validation needed for this resource.
 */
import * as fuelExpenseApi from '../api/fuelExpense';

export const listFuelLogs = (params) => fuelExpenseApi.listFuelLogs(params);
export const createFuelLog = (data) => fuelExpenseApi.createFuelLog(data);
export const listExpenses = (params) => fuelExpenseApi.listExpenses(params);
export const createExpense = (data) => fuelExpenseApi.createExpense(data);
