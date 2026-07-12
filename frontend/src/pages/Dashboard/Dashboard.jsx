import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Truck, Users, Navigation, Wrench, TrendingUp, TrendingDown,
  DollarSign, Plus, Download, CheckCircle, AlertTriangle, Clock, XCircle,
} from 'lucide-react';
import { DASHBOARD_KPIS, TRIPS, VEHICLES } from '../../constants/mockData';
import StatusBadge from '../../components/ui/StatusBadge';
import { PATHS } from '../../routes/paths';

/* ── KPI Card ── */
const KPI = ({ title, value, trend, change, icon: Icon, iconBg, iconColor, alert }) => (
  <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col justify-between h-36 hover:border-[#94a3b8] transition-all">
    <div className="flex justify-between items-start">
      <span className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconBg}`}>
        <Icon size={20} className={iconColor} />
      </span>
      {change && (
        <span className={`text-xs font-bold flex items-center gap-0.5 ${trend === 'up' ? 'text-[#16a34a]' : trend === 'down' ? 'text-[#dc2626]' : 'text-[#737686]'}`}>
          {trend === 'up' ? <TrendingUp size={12} /> : trend === 'down' ? <TrendingDown size={12} /> : null}
          {change}
        </span>
      )}
      {alert && (
        <span className="text-xs font-bold text-[#dc2626] bg-[#fee2e2] px-2 py-0.5 rounded-full">Alert</span>
      )}
    </div>
    <div>
      <p className="text-2xl font-bold text-[#131b2e] leading-none">{value}</p>
      <p className="text-xs font-semibold text-[#737686] uppercase tracking-wider mt-1">{title}</p>
    </div>
  </div>
);

/* ── Trip status map ── */
const tripStatusMap = {
  'in-transit': { status: 'info',    label: 'In Transit' },
  'delayed':    { status: 'warning', label: 'Delayed'    },
  'completed':  { status: 'success', label: 'Completed'  },
  'scheduled':  { status: 'neutral', label: 'Scheduled'  },
  'cancelled':  { status: 'danger',  label: 'Cancelled'  },
};

/* ── Vehicle status map ── */
const vehicleStatusMap = {
  'active':      { status: 'success', label: 'Active'      },
  'maintenance': { status: 'warning', label: 'Maintenance' },
  'idle':        { status: 'neutral', label: 'Idle'        },
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const kpi = DASHBOARD_KPIS;
  const recentTrips    = TRIPS.slice(0, 5);
  const fleetStatus    = VEHICLES.slice(0, 5);

  const kpiCards = [
    { title: 'Active Vehicles', value: kpi.activeVehicles.value, trend: kpi.activeVehicles.trend, change: kpi.activeVehicles.change, icon: Truck,       iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { title: 'Available',       value: kpi.available.value,      trend: 'neutral',                change: '',                          icon: CheckCircle, iconBg: 'bg-[#dcfce7]', iconColor: 'text-[#16a34a]' },
    { title: 'In Service',      value: kpi.inService.value,      trend: 'neutral',                change: '',                          icon: Wrench,      iconBg: 'bg-[#fee2e2]', iconColor: 'text-[#dc2626]', alert: true },
    { title: 'Active Trips',    value: kpi.activeTrips.value,    trend: kpi.activeTrips.trend,    change: kpi.activeTrips.change,      icon: Navigation,  iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { title: 'On-Time Rate',    value: kpi.onTimeRate.value,     trend: kpi.onTimeRate.trend,     change: kpi.onTimeRate.change,       icon: TrendingUp,  iconBg: 'bg-[#dcfce7]', iconColor: 'text-[#16a34a]' },
    { title: 'Revenue (MTD)',   value: kpi.revenue.value,        trend: kpi.revenue.trend,        change: kpi.revenue.change,          icon: DollarSign,  iconBg: 'bg-[#eff6ff]', iconColor: 'text-[#2563eb]' },
    { title: 'Fuel Cost (MTD)', value: kpi.fuelCost.value,      trend: 'down',                   change: kpi.fuelCost.change,         icon: AlertTriangle,iconBg:'bg-[#fef3c7]',iconColor: 'text-[#d97706]' },
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
          <button className="inline-flex items-center gap-1.5 h-9 px-4 border border-[#e2e8f0] text-[#475569] text-sm font-medium rounded-lg hover:bg-[#f8fafc] transition-colors">
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
              <p className="text-xs text-[#737686] mt-0.5">Live status of active routes</p>
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
                  {['Trip ID', 'Route', 'Driver', 'Cargo', 'Status', 'ETA'].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentTrips.map((t, i) => {
                  const st = tripStatusMap[t.status] ?? { status: 'neutral', label: t.status };
                  return (
                    <tr key={t.id} className={`border-b border-[#f8fafc] hover:bg-[#f8fafc] transition-colors ${i % 2 === 1 ? 'bg-[#fafafa]' : ''}`}>
                      <td className="px-4 py-3 font-mono text-xs text-[#475569]">{t.id}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="text-[#131b2e] font-medium">{t.from}</span>
                        <span className="mx-1.5 text-[#c3c6d7]">→</span>
                        <span className="text-[#131b2e] font-medium">{t.to}</span>
                      </td>
                      <td className="px-4 py-3 text-[#131b2e] whitespace-nowrap">{t.driver}</td>
                      <td className="px-4 py-3 text-[#475569]">{t.cargo}</td>
                      <td className="px-4 py-3"><StatusBadge status={st.status} label={st.label} size="sm" /></td>
                      <td className="px-4 py-3 text-xs text-[#737686] whitespace-nowrap">{t.eta !== '—' ? t.eta.split(' ')[0] : '—'}</td>
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
            {fleetStatus.map((v) => {
              const st = vehicleStatusMap[v.status] ?? { status: 'neutral', label: v.status };
              return (
                <div key={v.id} className="flex items-center justify-between px-5 py-3 hover:bg-[#f8fafc] transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center shrink-0">
                      <Truck size={15} className="text-[#2563eb]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#131b2e] truncate">{v.plate}</p>
                      <p className="text-xs text-[#737686]">{v.make}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                    <StatusBadge status={st.status} label={st.label} size="sm" />
                    <span className="text-xs text-[#737686]">{v.fuel}% fuel</span>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Fleet summary bar */}
          <div className="px-5 py-4 bg-[#f8fafc] border-t border-[#f1f5f9]">
            <div className="flex justify-between text-xs font-medium text-[#475569] mb-2">
              <span>Fleet Utilization</span>
              <span>78%</span>
            </div>
            <div className="h-2 bg-[#e2e8f0] rounded-full overflow-hidden">
              <div className="h-full w-[78%] bg-[#2563eb] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Trips Completed Today',    value: '24',    icon: CheckCircle,   color: 'text-[#16a34a]', bg: 'bg-[#dcfce7]' },
          { label: 'Trips Delayed',            value: '3',     icon: Clock,          color: 'text-[#d97706]', bg: 'bg-[#fef3c7]' },
          { label: 'Maintenance Alerts',       value: '2',     icon: AlertTriangle,  color: 'text-[#dc2626]', bg: 'bg-[#fee2e2]' },
          { label: 'Drivers On Shift',         value: '18',    icon: Users,          color: 'text-[#2563eb]', bg: 'bg-[#eff6ff]' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#e2e8f0] px-4 py-4 flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-xl font-bold text-[#131b2e]">{s.value}</p>
              <p className="text-xs text-[#737686] leading-tight mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
