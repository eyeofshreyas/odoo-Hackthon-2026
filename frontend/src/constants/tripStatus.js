/**
 * TRIP_STATUS — must match backend Trip.status enum exactly
 * (backend/src/models/Trip.js). Shipments page reuses this — the backend
 * has no separate Shipment model, Shipments is a Trip-cargo view.
 */
export const TRIP_STATUS = {
  DRAFT: 'Draft',
  DISPATCHED: 'Dispatched',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const TRIP_STATUS_OPTIONS = Object.values(TRIP_STATUS);

export const TRIP_STATUS_BADGE = {
  [TRIP_STATUS.DRAFT]: { status: 'neutral', label: 'Draft' },
  [TRIP_STATUS.DISPATCHED]: { status: 'info', label: 'Dispatched' },
  [TRIP_STATUS.COMPLETED]: { status: 'success', label: 'Completed' },
  [TRIP_STATUS.CANCELLED]: { status: 'danger', label: 'Cancelled' },
};
