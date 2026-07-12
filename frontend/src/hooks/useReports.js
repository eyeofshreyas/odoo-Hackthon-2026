/**
 * useReports hook — fetches dashboard KPIs + per-vehicle report rows on
 * mount (Reports page only; both endpoints require Fleet Manager /
 * Financial Analyst, so this hook is not used on the general Dashboard).
 */
import { useState, useEffect, useCallback } from 'react';
import * as reportService from '../services/report.service';

const useReports = () => {
  const [dashboard, setDashboard] = useState(null);
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [dashboardData, reportsData] = await Promise.all([
        reportService.getDashboard(),
        reportService.getReports(),
      ]);
      setDashboard(dashboardData);
      setReports(reportsData ?? []);
    } catch (err) {
      setError(err.response?.data?.message ?? 'Failed to load reports');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return {
    dashboard,
    reports,
    isLoading,
    error,
    refetch,
    exportCSV: reportService.exportReportsCSV,
    exportPDF: reportService.exportReportsPDF,
  };
};

export default useReports;
