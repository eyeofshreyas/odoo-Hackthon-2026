/**
 * Reports API: dashboard KPIs, per-vehicle report rows, and CSV/PDF export.
 * All functions use the configured axios instance (src/api/axios.js)
 * and unwrap the backend's { success, message, data } envelope.
 */
import api, { TOKEN_KEY } from './axios';

export const getDashboard = () => api.get('/dashboard').then((res) => res.data.data);

export const getReports = () => api.get('/reports').then((res) => res.data.data);

/**
 * Downloads a file from a protected export endpoint.
 * The shared axios instance is JSON-oriented, so this does a manual fetch
 * (still attaching the Bearer token) and saves the response blob via a
 * temporary <a> tag — window.open() can't carry an Authorization header.
 */
async function downloadReport(path, filename) {
  const token = localStorage.getItem(TOKEN_KEY);
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${path}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    throw new Error(`Export failed (${res.status})`);
  }
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export const exportReportsCSV = () => downloadReport('/reports/export/csv', 'transitops-report.csv');
export const exportReportsPDF = () => downloadReport('/reports/export/pdf', 'transitops-report.pdf');
