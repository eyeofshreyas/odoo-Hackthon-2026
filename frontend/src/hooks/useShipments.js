/**
 * useShipments hook — Shipments is a cargo-focused view of the same
 * backend Trip resource (no separate Shipment model exists). This is a
 * thin wrapper over useTrips that renames `trips` to `shipments`.
 */
import useTrips from './useTrips';

const useShipments = (params) => {
  const { trips, ...rest } = useTrips(params);
  return { shipments: trips, ...rest };
};

export default useShipments;
