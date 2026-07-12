/**
 * maintenance.service — thin pass-through to src/api/maintenance.js.
 * No extra shaping/validation needed for this resource.
 */
import * as maintenanceApi from '../api/maintenance';

export const listMaintenance = () => maintenanceApi.listMaintenance();
export const createMaintenance = (data) => maintenanceApi.createMaintenance(data);
export const closeMaintenance = (id) => maintenanceApi.closeMaintenance(id);
