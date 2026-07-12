/**
 * useFuelExpense hook — fetches fuel logs and expenses (two separate
 * backend resources shown together on this page) in parallel on mount,
 * and exposes create helpers that refetch both afterward.
 */
import { useState, useEffect, useCallback } from 'react';
import * as fuelExpenseService from '../services/fuelExpense.service';

const useFuelExpense = () => {
  const [fuelLogs, setFuelLogs] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [fuelData, expenseData] = await Promise.all([
        fuelExpenseService.listFuelLogs(),
        fuelExpenseService.listExpenses(),
      ]);
      setFuelLogs(fuelData ?? []);
      setExpenses(expenseData ?? []);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to load fuel logs and expenses');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createFuelLog = async (data) => {
    await fuelExpenseService.createFuelLog(data);
    await refetch();
  };

  const createExpense = async (data) => {
    await fuelExpenseService.createExpense(data);
    await refetch();
  };

  return { fuelLogs, expenses, isLoading, error, refetch, createFuelLog, createExpense };
};

export default useFuelExpense;
