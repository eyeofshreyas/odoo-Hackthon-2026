/**
 * Vehicles API: list, create, update, delete.
 * All functions use the configured axios instance (src/api/axios.js)
 * and unwrap the backend's { success, message, data } envelope.
 */
import api from './axios';

export const listVehicles = (params) =>
  api.get('/vehicles', { params }).then((res) => res.data.data);

export const createVehicle = (data) =>
  api.post('/vehicles', data).then((res) => res.data.data);

export const updateVehicle = (id, data) =>
  api.put(`/vehicles/${id}`, data).then((res) => res.data.data);

export const deleteVehicle = (id) =>
  api.delete(`/vehicles/${id}`).then((res) => res.data.data);
