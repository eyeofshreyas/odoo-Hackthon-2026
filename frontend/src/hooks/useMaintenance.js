/**
 * useMaintenance hook — fetches maintenance records on mount and exposes
 * create/close helpers. Mutations refetch the list afterward (simplest
 * correct approach at hackathon scale — no optimistic-update bookkeeping).
 */
import { useState, useEffect, useCallback } from 'react';
import * as maintenanceService from '../services/maintenance.service';

const useMaintenance = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await maintenanceService.listMaintenance();
      setRecords(data ?? []);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to load maintenance records');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createMaintenance = async (data) => {
    await maintenanceService.createMaintenance(data);
    await refetch();
  };

  const closeMaintenance = async (id) => {
    await maintenanceService.closeMaintenance(id);
    await refetch();
  };

  return { records, isLoading, error, refetch, createMaintenance, closeMaintenance };
};

export default useMaintenance;
