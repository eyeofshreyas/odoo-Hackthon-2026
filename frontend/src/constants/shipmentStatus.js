/**
 * SHIPMENT_STATUS — Shipments is a Trip-cargo view, there is no separate
 * Shipment model on the backend. Re-export Trip's status enum so both
 * pages stay in sync with the single source of truth.
 */
export { TRIP_STATUS as SHIPMENT_STATUS, TRIP_STATUS_OPTIONS as SHIPMENT_STATUS_OPTIONS, TRIP_STATUS_BADGE as SHIPMENT_STATUS_BADGE } from './tripStatus';
