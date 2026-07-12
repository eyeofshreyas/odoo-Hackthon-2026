/**
 * Trips API: list, create, dispatch, complete, cancel.
 * All functions use the configured axios instance (src/api/axios.js)
 * and unwrap the backend's { success, message, data } envelope.
 */
import api from './axios';

export const listTrips = (params) =>
  api.get('/trips', { params }).then((res) => res.data.data);

export const createTrip = (data) =>
  api.post('/trips', data).then((res) => res.data.data);

export const dispatchTrip = (id) =>
  api.patch(`/trips/${id}/dispatch`).then((res) => res.data.data);

export const completeTrip = (id, data) =>
  api.patch(`/trips/${id}/complete`, data).then((res) => res.data.data);

export const cancelTrip = (id) =>
  api.patch(`/trips/${id}/cancel`).then((res) => res.data.data);
