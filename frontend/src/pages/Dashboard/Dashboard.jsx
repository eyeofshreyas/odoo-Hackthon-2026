import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck, Users, Navigation, Wrench, TrendingUp,
  Plus, Download, CheckCircle, Clock, AlertCircle,
} from 'lucide-react';
import { getDashboard } from '../../api/reports';
import { listTrips } from '../../api/trips';
import { listVehicles } from '../../api/vehicles';
import StatusBadge from '../../components/ui/StatusBadge';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { PATHS } from '../../routes/paths';

/* ── KPI Card ── */
const KPI = ({ title, value, icon: Icon, iconBg, iconColor }) => (
  <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col justify-between h-36 hover:border-[#94a3b8] transition-all">
    <span className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconBg}`}>
      <Icon size={20} className={iconColor} />
    </span>
    <div>
      <p className="text-2xl font-bold text-[#131b2e] leading-none">{value}</p>
      <p className="text-xs font-semibold text-[#737686] uppercase tracking-wider mt-1">{title}</p>
    </div>
  </div>
);

/* ── Trip status map (backend enum: Draft, Dispatched, Completed, Cancelled) ── */
const tripStatusMap = {
  Draft:      { status: 'neutral', label: 'Draft' },
  Dispatched: { status: 'info',    label: 'Dispatched' },
  Completed:  { status: 'success', label: 'Completed' },
  Cancelled:  { status: 'danger',  label: 'Cancelled' },
};

/* ── Vehicle status map (backend enum: Available, On Trip, In Shop, Retired) ── */
const vehicleStatusMap = {
  Available: { status: 'success', label: 'Available' },
  'On Trip': { status: 'info',    label: 'On Trip' },
  'In Shop': { status: 'warning', label: 'In Shop' },
  Retired:   { status: 'neutral', label: 'Retired' },
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [recentTrips, setRecentTrips] = useState([]);
  const [fleetStatus, setFleetStatus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Recent Trips / Fleet Status have no dedicated "recent" backend
        // endpoint — reusing the real list endpoints and taking the first
        // few is simplest and avoids fabricating data.
        const [dashboardData, trips, vehicles] = await Promise.all([
          getDashboard(),
          listTrips(),
          listVehicles(),
        ]);
        if (cancelled) return;
        setDashboard(dashboardData);
        setRecentTrips((trips ?? []).slice(0, 5));
        setFleetStatus((vehicles ?? []).slice(0, 5));
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message ?? 'Failed to load dashboard data');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" label="Loading dashboard…" />
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

  const kpiCards = [
    { title: 'Active Vehicles (On Trip)', value: dashboard.activeVehicles,       icon: Truck,      iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { title: 'Available Vehicles',        value: dashboard.availableVehicles,    icon: CheckCircle,iconBg: 'bg-[#dcfce7]', iconColor: 'text-[#16a34a]' },
    { title: 'In Maintenance',            value: dashboard.vehiclesInMaintenance,icon: Wrench,     iconBg: 'bg-[#fee2e2]', iconColor: 'text-[#dc2626]' },
    { title: 'Active Trips',              value: dashboard.activeTrips,          icon: Navigation, iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { title: 'Pending Trips',             value: dashboard.pendingTrips,         icon: Clock,       iconBg: 'bg-[#fef3c7]', iconColor: 'text-[#d97706]' },
    { title: 'Drivers On Duty',           value: dashboard.driversOnDuty,        icon: Users,       iconBg: 'bg-[#f5f3ff]', iconColor: 'text-[#7c3aed]' },
    { title: 'Fleet Utilization',         value: `${dashboard.fleetUtilization}%`, icon: TrendingUp,iconBg: 'bg-[#dcfce7]', iconColor: 'text-[#16a34a]' },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Operations Dashboard</h1>
          <p className="text-sm text-[#737686] mt-0.5">Real-time oversight of fleet logistics and performance.</p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={() => navigate(PATHS.TRIPS)}
            className="inline-flex items-center gap-1.5 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm shadow-[#2563eb]/20"
          >
            <Plus size={16} />
            Schedule Trip
          </button>
          <button
            onClick={() => navigate(PATHS.REPORTS)}
            className="inline-flex items-center gap-1.5 h-9 px-4 border border-[#e2e8f0] text-[#475569] text-sm font-medium rounded-lg hover:bg-[#f8fafc] transition-colors"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
        {kpiCards.map((k) => <KPI key={k.title} {...k} />)}
      </div>

      {/* Lower section: Trips table + Fleet status */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Recent Trips — 2/3 width */}
        <div className="xl:col-span-2 bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f1f5f9]">
            <div>
              <h2 className="text-sm font-semibold text-[#131b2e]">Recent Trips</h2>
              <p className="text-xs text-[#737686] mt-0.5">Latest trips in the system</p>
            </div>
            <button
              onClick={() => navigate(PATHS.TRIPS)}
              className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#f1f5f9]">
                  {['Route', 'Driver', 'Cargo', 'Status'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentTrips.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-6 text-center text-sm text-[#737686]">No trips yet.</td></tr>
                ) : recentTrips.map((t, i) => {
                  const st = tripStatusMap[t.status] ?? { status: 'neutral', label: t.status };
                  return (
                    <tr key={t._id} className={`border-b border-[#f8fafc] hover:bg-[#f8fafc] transition-colors ${i % 2 === 1 ? 'bg-[#fafafa]' : ''}`}>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[#131b2e] font-medium">{t.source}</span>
                        <span className="mx-1.5 text-[#c3c6d7]">→</span>
                        <span className="text-[#131b2e] font-medium">{t.destination}</span>
                      </td>
                      <td className="px-4 py-3 text-[#131b2e] whitespace-nowrap">{t.driverId?.name ?? '—'}</td>
                      <td className="px-4 py-3 text-[#475569]">{t.cargoWeight} kg</td>
                      <td className="px-4 py-3"><StatusBadge status={st.status} label={st.label} size="sm" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fleet Status — 1/3 width */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f1f5f9]">
            <div>
              <h2 className="text-sm font-semibold text-[#131b2e]">Fleet Status</h2>
              <p className="text-xs text-[#737686] mt-0.5">Top vehicles overview</p>
            </div>
            <button
              onClick={() => navigate(PATHS.VEHICLES)}
              className="text-xs font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
            >
              View all →
            </button>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {fleetStatus.length === 0 ? (
              <p className="px-5 py-6 text-center text-sm text-[#737686]">No vehicles yet.</p>
            ) : fleetStatus.map((v) => {
              const st = vehicleStatusMap[v.status] ?? { status: 'neutral', label: v.status };
              return (
                <div key={v._id} className="flex items-center justify-between px-5 py-3 hover:bg-[#f8fafc] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0">
                      <Truck size={15} className="text-[#2563eb]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#131b2e] truncate">{v.registrationNumber}</p>
                      <p className="text-xs text-[#737686]">{v.vehicleName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                    <StatusBadge status={st.status} label={st.label} size="sm" />
                    <span className="text-xs text-[#737686]">{v.odometer?.toLocaleString('en-IN')} km</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Fleet utilization bar — real value from /api/dashboard */}
          <div className="px-5 py-4 bg-[#f8fafc] border-t border-[#f1f5f9]">
            <div className="flex justify-between text-xs font-medium text-[#475569] mb-2">
              <span>Fleet Utilization</span>
              <span>{dashboard.fleetUtilization}%</span>
            </div>
            <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
              <div className="h-full bg-[#2563eb] rounded-full" style={{ width: `${dashboard.fleetUtilization}%` }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
