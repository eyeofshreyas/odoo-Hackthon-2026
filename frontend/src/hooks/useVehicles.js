/**
 * useVehicles hook — fetches vehicles on mount and exposes CRUD helpers.
 * Mutations refetch the list afterward (simplest correct approach at
 * hackathon scale — no optimistic-update bookkeeping needed).
 */
import { useState, useEffect, useCallback } from 'react';
import * as vehicleService from '../services/vehicle.service';

const useVehicles = (params) => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await vehicleService.listVehicles(params);
      setVehicles(data ?? []);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to load vehicles');
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(params)]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createVehicle = async (data) => {
    await vehicleService.createVehicle(data);
    await refetch();
  };

  const updateVehicle = async (id, data) => {
    await vehicleService.updateVehicle(id, data);
    await refetch();
  };

  const deleteVehicle = async (id) => {
    await vehicleService.deleteVehicle(id);
    await refetch();
  };

  return { vehicles, isLoading, error, refetch, createVehicle, updateVehicle, deleteVehicle };
};

export default useVehicles;
