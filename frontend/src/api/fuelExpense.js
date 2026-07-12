/**
 * Fuel & Expense API: fuel logs and expenses (separate backend resources
 * shown together on one page). All functions use the configured axios
 * instance (src/api/axios.js) and unwrap the backend's
 * { success, message, data } envelope.
 */
import api from './axios';

export const listFuelLogs = (params) =>
  api.get('/fuel', { params }).then((res) => res.data.data);

export const createFuelLog = (data) =>
  api.post('/fuel', data).then((res) => res.data.data);

export const listExpenses = (params) =>
  api.get('/expenses', { params }).then((res) => res.data.data);

export const createExpense = (data) =>
  api.post('/expenses', data).then((res) => res.data.data);
