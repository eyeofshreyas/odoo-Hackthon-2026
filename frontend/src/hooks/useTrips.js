/**
 * useTrips hook — fetches trips on mount and exposes lifecycle helpers.
 * Mutations refetch the list afterward (simplest correct approach at
 * hackathon scale — no optimistic-update bookkeeping needed).
 */
import { useState, useEffect, useCallback } from 'react';
import * as tripService from '../services/trip.service';

const useTrips = (params) => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await tripService.listTrips(params);
      setTrips(data ?? []);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to load trips');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createTrip = async (data) => {
    await tripService.createTrip(data);
    await refetch();
  };

  const dispatchTrip = async (id) => {
    await tripService.dispatchTrip(id);
    await refetch();
  };

  const completeTrip = async (id, data) => {
    await tripService.completeTrip(id, data);
    await refetch();
  };

  const cancelTrip = async (id) => {
    await tripService.cancelTrip(id);
    await refetch();
  };

  return { trips, isLoading, error, refetch, createTrip, dispatchTrip, completeTrip, cancelTrip };
};

export default useTrips;
