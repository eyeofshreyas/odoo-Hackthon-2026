/**
 * driver.service — thin pass-through to src/api/drivers.js.
 * No extra shaping/validation needed for this resource.
 */
import * as driversApi from '../api/drivers';

export const listDrivers = (params) => driversApi.listDrivers(params);
export const createDriver = (data) => driversApi.createDriver(data);
export const updateDriver = (id, data) => driversApi.updateDriver(id, data);
export const deleteDriver = (id) => driversApi.deleteDriver(id);
