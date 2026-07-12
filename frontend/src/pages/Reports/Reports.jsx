import { BarChart3, Truck, Users, Navigation, Download } from 'lucide-react';
import { VEHICLES, DRIVERS, TRIPS, FUEL_LOGS } from '../../constants/mockData';
import StatusBadge from '../../components/ui/StatusBadge';

const ReportsPage = () => {
  const completedTrips = TRIPS.filter(t => t.status === 'completed').length;
  const totalTrips     = TRIPS.length;
  const onTimeRate     = Math.round((completedTrips / totalTrips) * 100);
  const totalFuelCost  = FUEL_LOGS.reduce((s, f) => s + f.amount, 0);

  const metrics = [
    { label: 'Fleet Utilization',  value: '78%',  bar: 78,  color: '#2563eb', trend: '+4%' },
    { label: 'On-Time Delivery',   value: `${onTimeRate}%`, bar: onTimeRate, color: '#16a34a', trend: '+2%' },
    { label: 'Driver Satisfaction',value: '91%',  bar: 91,  color: '#7c3aed', trend: '+1%' },
    { label: 'Cost Efficiency',    value: '83%',  bar: 83,  color: '#d97706', trend: '-2%' },
  ];

  const vehicleStatus = [
    { label: 'Active',      count: VEHICLES.filter(v=>v.status==='active').length,      color: '#16a34a' },
    { label: 'Maintenance', count: VEHICLES.filter(v=>v.status==='maintenance').length, color: '#d97706' },
    { label: 'Idle',        count: VEHICLES.filter(v=>v.status==='idle').length,        color: '#737686' },
  ];

  const driverStatus = [
    { label: 'Active',    count: DRIVERS.filter(d=>d.status==='active').length,    color: '#16a34a' },
    { label: 'On Leave',  count: DRIVERS.filter(d=>d.status==='on-leave').length,  color: '#d97706' },
    { label: 'Inactive',  count: DRIVERS.filter(d=>d.status==='inactive').length,  color: '#737686' },
  ];

  /* Simulated weekly trip data */
  const weeklyTrips = [
    { day: 'Mon', count: 12 }, { day: 'Tue', count: 18 }, { day: 'Wed', count: 15 },
    { day: 'Thu', count: 22 }, { day: 'Fri', count: 19 }, { day: 'Sat', count: 8 }, { day: 'Sun', count: 5 },
  ];
  const maxCount = Math.max(...weeklyTrips.map(d => d.count));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Fleet Reports</h1>
          <p className="text-sm text-[#737686] mt-0.5">Operational performance overview · July 2026</p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 border border-[#e2e8f0] text-[#475569] text-sm font-medium rounded-lg hover:bg-[#f8fafc] transition-colors">
          <Download size={16} />Download PDF
        </button>
      </div>

      {/* KPI summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { icon: Truck,       label: 'Total Vehicles', value: VEHICLES.length,  bg: 'bg-[#eff6ff]', color: 'text-[#2563eb]' },
          { icon: Users,       label: 'Active Drivers', value: DRIVERS.filter(d=>d.status==='active').length, bg: 'bg-[#dcfce7]', color: 'text-[#16a34a]' },
          { icon: Navigation,  label: 'Trips This Week', value: TRIPS.length,    bg: 'bg-[#f5f3ff]', color: 'text-[#7c3aed]' },
          { icon: BarChart3,   label: 'Fuel Spend',     value: `₹${(totalFuelCost/1000).toFixed(0)}K`, bg: 'bg-[#fef3c7]', color: 'text-[#d97706]' },
        ].map(k => (
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

      {/* Two columns */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Performance metrics */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
          <h2 className="text-sm font-semibold text-[#131b2e] mb-4">Performance Metrics</h2>
          <div className="space-y-4">
            {metrics.map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs font-medium mb-1.5">
                  <span className="text-[#475569]">{m.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#131b2e]">{m.value}</span>
                    <span className={`text-[10px] font-semibold ${m.trend.startsWith('+') ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>{m.trend}</span>
                  </div>
                </div>
                <div className="h-2.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${m.bar}%`, backgroundColor: m.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly trips chart (pure CSS bars) */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
          <h2 className="text-sm font-semibold text-[#131b2e] mb-4">Weekly Trip Volume</h2>
          <div className="flex items-end justify-between gap-2 h-40">
            {weeklyTrips.map(d => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-xs font-bold text-[#475569]">{d.count}</span>
                <div className="w-full rounded-t-md bg-[#2563eb] transition-all duration-700" style={{ height: `${(d.count / maxCount) * 120}px`, minHeight: '4px', opacity: 0.7 + (d.count / maxCount) * 0.3 }} />
                <span className="text-[10px] text-[#737686] font-medium">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle status donut-like summary */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] p-5">
          <h2 className="text-sm font-semibold text-[#131b2e] mb-4">Fleet Composition</h2>
          <div className="space-y-3">
            {vehicleStatus.map(s => (
              <div key={s.label}>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-[#475569]">{s.label}</span>
                  <span className="font-bold" style={{ color: s.color }}>{s.count} vehicles</span>
                </div>
                <div className="h-3 bg-[#e2e8f0] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${(s.count / VEHICLES.length) * 100}%`, backgroundColor: s.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#f1f5f9] flex gap-4">
            {vehicleStatus.map(s => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-xs text-[#737686]">{s.label} ({s.count})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top drivers */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f1f5f9]">
            <h2 className="text-sm font-semibold text-[#131b2e]">Top Performing Drivers</h2>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {[...DRIVERS].sort((a,b) => b.rating - a.rating).slice(0,5).map((d, i) => (
              <div key={d.id} className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i===0?'bg-[#fef3c7] text-[#d97706]':i===1?'bg-[#f1f5f9] text-[#475569]':i===2?'bg-[#fde68a] text-[#92400e]':'bg-white text-[#737686]'}`}>{i+1}</span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563eb] to-[#004ac6] flex items-center justify-center text-white text-xs font-bold">
                    {d.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#131b2e]">{d.name}</p>
                    <p className="text-xs text-[#737686]">{d.trips} trips completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#eab308]">
                  <span className="text-sm font-bold text-[#131b2e]">{d.rating}</span>
                  <span className="text-sm">★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
