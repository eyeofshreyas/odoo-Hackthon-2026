/**
 * report.service — thin pass-through to src/api/reports.js.
 * No extra shaping/validation needed for this resource.
 */
import * as reportsApi from '../api/reports';

export const getDashboard = () => reportsApi.getDashboard();
export const getReports = () => reportsApi.getReports();
export const exportReportsCSV = () => reportsApi.exportReportsCSV();
export const exportReportsPDF = () => reportsApi.exportReportsPDF();
