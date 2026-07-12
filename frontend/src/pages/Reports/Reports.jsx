import { useState } from 'react';
import { Truck, Gauge, IndianRupee, TrendingUp, Download, FileText, AlertCircle } from 'lucide-react';
import useReports from '../../hooks/useReports';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const avg = (nums) => (nums.length ? nums.reduce((s, n) => s + n, 0) / nums.length : 0);

const ReportsPage = () => {
  const { reports, isLoading, error, exportCSV, exportPDF } = useReports();
  const [exporting, setExporting] = useState(null); // 'csv' | 'pdf' | null
  const [exportError, setExportError] = useState(null);

  const vehicleCount = reports.length;
  const avgFuelEfficiency = avg(reports.map((r) => r.fuelEfficiencyKmPerLiter));
  const totalOperationalCost = reports.reduce((s, r) => s + r.operationalCost, 0);
  const avgROI = avg(reports.map((r) => r.vehicleROI));

  const kpis = [
    { icon: Truck,      label: 'Vehicles Reported',    value: vehicleCount,                                  bg: 'bg-[#eff6ff]', color: 'text-[#2563eb]' },
    { icon: Gauge,      label: 'Avg Fuel Efficiency',  value: `${avgFuelEfficiency.toFixed(2)} km/L`,        bg: 'bg-[#dcfce7]', color: 'text-[#16a34a]' },
    { icon: IndianRupee,label: 'Total Operational Cost', value: `₹${totalOperationalCost.toLocaleString('en-IN')}`, bg: 'bg-[#fef3c7]', color: 'text-[#d97706]' },
    { icon: TrendingUp, label: 'Avg Vehicle ROI',      value: `${avgROI.toFixed(2)}%`,                        bg: 'bg-[#f5f3ff]', color: 'text-[#7c3aed]' },
  ];

  const runExport = async (kind, fn) => {
    setExporting(kind);
    setExportError(null);
    try {
      await fn();
    } catch (err) {
      setExportError(err.message ?? `Failed to export ${kind.toUpperCase()}`);
    } finally {
      setExporting(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" label="Loading reports…" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#dc2626] bg-[#fee2e2] border border-[#fecaca] rounded-lg p-4">
        <AlertCircle size={18} />
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Fleet Reports</h1>
          <p className="text-sm text-[#737686] mt-0.5">Per-vehicle fuel efficiency, operational cost & ROI</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => runExport('csv', exportCSV)}
            disabled={exporting !== null}
            className="inline-flex items-center gap-2 h-9 px-4 border border-[#e2e8f0] text-[#475569] text-sm font-medium rounded-lg hover:bg-[#f8fafc] transition-colors disabled:opacity-50"
          >
            <Download size={16} />{exporting === 'csv' ? 'Exporting…' : 'Export CSV'}
          </button>
          <button
            onClick={() => runExport('pdf', exportPDF)}
            disabled={exporting !== null}
            className="inline-flex items-center gap-2 h-9 px-4 border border-[#e2e8f0] text-[#475569] text-sm font-medium rounded-lg hover:bg-[#f8fafc] transition-colors disabled:opacity-50"
          >
            <FileText size={16} />{exporting === 'pdf' ? 'Exporting…' : 'Export PDF'}
          </button>
        </div>
      </div>

      {exportError && (
        <div className="flex items-center gap-2 text-sm text-[#dc2626] bg-[#fee2e2] border border-[#fecaca] rounded-lg p-3">
          <AlertCircle size={16} />
          {exportError}
        </div>
      )}

      {/* KPI summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${k.bg} flex items-center justify-center shrink-0`}>
              <k.icon size={18} className={k.color} />
            </div>
            <div>
              <p className="text-xl font-bold text-[#131b2e]">{k.value}</p>
              <p className="text-xs text-[#737686]">{k.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Per-vehicle table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#f1f5f9]">
          <h2 className="text-sm font-semibold text-[#131b2e]">Vehicle Performance</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f1f5f9]">
                {['Registration No.', 'Fuel Efficiency (km/L)', 'Operational Cost', 'Vehicle ROI'].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-6 text-center text-sm text-[#737686]">
                    No report data available.
                  </td>
                </tr>
              ) : (
                reports.map((r, i) => (
                  <tr key={r.registrationNumber} className={`border-b border-[#f8fafc] hover:bg-[#f8fafc] transition-colors ${i % 2 === 1 ? 'bg-[#fafafa]' : ''}`}>
                    <td className="px-5 py-3 font-mono text-xs text-[#475569]">{r.registrationNumber}</td>
                    <td className="px-5 py-3 text-[#131b2e]">{r.fuelEfficiencyKmPerLiter.toFixed(2)}</td>
                    <td className="px-5 py-3 text-[#131b2e]">₹{r.operationalCost.toLocaleString('en-IN')}</td>
                    <td className={`px-5 py-3 font-semibold ${r.vehicleROI >= 0 ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                      {r.vehicleROI.toFixed(2)}%
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
