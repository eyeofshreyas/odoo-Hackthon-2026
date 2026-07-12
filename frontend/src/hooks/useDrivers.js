/**
 * useDrivers hook — fetches drivers on mount, exposes CRUD helpers
 * that refetch the list afterwards.
 */
import { useCallback, useEffect, useState } from 'react';
import * as driverService from '../services/driver.service';

const useDrivers = (params) => {
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await driverService.listDrivers(params);
      setDrivers(data ?? []);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to load drivers');
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createDriver = async (data) => {
    await driverService.createDriver(data);
    await refetch();
  };

  const updateDriver = async (id, data) => {
    await driverService.updateDriver(id, data);
    await refetch();
  };

  const deleteDriver = async (id) => {
    await driverService.deleteDriver(id);
    await refetch();
  };

  return { drivers, isLoading, error, refetch, createDriver, updateDriver, deleteDriver };
};

export default useDrivers;
