/**
 * DRIVER_STATUS — must match backend Driver.status enum exactly
 * (backend/src/models/Driver.js).
 */
export const DRIVER_STATUS = {
  AVAILABLE: 'Available',
  ON_TRIP: 'On Trip',
  OFF_DUTY: 'Off Duty',
  SUSPENDED: 'Suspended',
};

export const DRIVER_STATUS_OPTIONS = Object.values(DRIVER_STATUS);

export const DRIVER_STATUS_BADGE = {
  [DRIVER_STATUS.AVAILABLE]: { status: 'success', label: 'Available' },
  [DRIVER_STATUS.ON_TRIP]: { status: 'info', label: 'On Trip' },
  [DRIVER_STATUS.OFF_DUTY]: { status: 'neutral', label: 'Off Duty' },
  [DRIVER_STATUS.SUSPENDED]: { status: 'danger', label: 'Suspended' },
};
