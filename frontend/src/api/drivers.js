/**
 * Drivers API: list, create, update, delete.
 * All functions use the configured axios instance (src/api/axios.js)
 * and unwrap the backend's { success, message, data } envelope.
 */
import api from './axios';

export const listDrivers = (params) =>
  api.get('/drivers', { params }).then((res) => res.data.data);

export const createDriver = (data) =>
  api.post('/drivers', data).then((res) => res.data.data);

export const updateDriver = (id, data) =>
  api.put(`/drivers/${id}`, data).then((res) => res.data.data);

export const deleteDriver = (id) =>
  api.delete(`/drivers/${id}`).then((res) => res.data.data);
