/**
 * vehicle.service — thin pass-through to src/api/vehicles.js.
 * No extra shaping/validation needed for this resource.
 */
import * as vehiclesApi from '../api/vehicles';

export const listVehicles = (params) => vehiclesApi.listVehicles(params);
export const createVehicle = (data) => vehiclesApi.createVehicle(data);
export const updateVehicle = (id, data) => vehiclesApi.updateVehicle(id, data);
export const deleteVehicle = (id) => vehiclesApi.deleteVehicle(id);
