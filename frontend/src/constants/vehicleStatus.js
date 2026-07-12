/**
 * VEHICLE_STATUS — must match backend Vehicle.status enum exactly
 * (backend/src/models/Vehicle.js).
 */
export const VEHICLE_STATUS = {
  AVAILABLE: 'Available',
  ON_TRIP: 'On Trip',
  IN_SHOP: 'In Shop',
  RETIRED: 'Retired',
};

export const VEHICLE_STATUS_OPTIONS = Object.values(VEHICLE_STATUS);

export const VEHICLE_STATUS_BADGE = {
  [VEHICLE_STATUS.AVAILABLE]: { status: 'success', label: 'Available' },
  [VEHICLE_STATUS.ON_TRIP]: { status: 'info', label: 'On Trip' },
  [VEHICLE_STATUS.IN_SHOP]: { status: 'warning', label: 'In Shop' },
  [VEHICLE_STATUS.RETIRED]: { status: 'neutral', label: 'Retired' },
};
