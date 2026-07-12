/**
 * Maintenance API: list, create, close.
 * All functions use the configured axios instance (src/api/axios.js)
 * and unwrap the backend's { success, message, data } envelope.
 */
import api from './axios';

export const listMaintenance = () =>
  api.get('/maintenance').then((res) => res.data.data);

export const createMaintenance = (data) =>
  api.post('/maintenance', data).then((res) => res.data.data);

export const closeMaintenance = (id) =>
  api.patch(`/maintenance/${id}/close`).then((res) => res.data.data);
