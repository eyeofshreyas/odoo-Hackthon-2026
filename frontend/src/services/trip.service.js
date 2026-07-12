/**
 * trip.service — thin pass-through to src/api/trips.js.
 * No extra shaping/validation needed for this resource.
 */
import * as tripsApi from '../api/trips';

export const listTrips = (params) => tripsApi.listTrips(params);
export const createTrip = (data) => tripsApi.createTrip(data);
export const dispatchTrip = (id) => tripsApi.dispatchTrip(id);
export const completeTrip = (id, data) => tripsApi.completeTrip(id, data);
export const cancelTrip = (id) => tripsApi.cancelTrip(id);
