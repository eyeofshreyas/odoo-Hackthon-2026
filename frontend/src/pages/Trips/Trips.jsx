import { useState, useMemo } from 'react';
import { Navigation, Plus, Search, MapPin, Clock } from 'lucide-react';
import { TRIPS } from '../../constants/mockData';
import StatusBadge from '../../components/ui/StatusBadge';

const statusMap = {
  'in-transit': { status: 'info',    label: 'In Transit' },
  'delayed':    { status: 'warning', label: 'Delayed'    },
  'completed':  { status: 'success', label: 'Completed'  },
  'scheduled':  { status: 'neutral', label: 'Scheduled'  },
  'cancelled':  { status: 'danger',  label: 'Cancelled'  },
};

const TripsPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => TRIPS.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch = !q || t.from.toLowerCase().includes(q) || t.to.toLowerCase().includes(q) || t.driver.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || t.status === filter;
    return matchSearch && matchFilter;
  }), [search, filter]);

  const stats = [
    { label: 'Active',    count: TRIPS.filter(t => t.status === 'in-transit').length, color: 'bg-[#dbeafe] text-[#1d4ed8]' },
    { label: 'Delayed',   count: TRIPS.filter(t => t.status === 'delayed').length,    color: 'bg-[#fef3c7] text-[#b45309]' },
    { label: 'Completed', count: TRIPS.filter(t => t.status === 'completed').length,  color: 'bg-[#dcfce7] text-[#15803d]' },
    { label: 'Scheduled', count: TRIPS.filter(t => t.status === 'scheduled').length,  color: 'bg-[#f1f5f9] text-[#475569]'  },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Trip Management</h1>
          <p className="text-sm text-[#737686] mt-0.5">{TRIPS.length} total trips this week</p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm">
          <Plus size={16} />Schedule Trip
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[#131b2e]">{s.count}</p>
              <p className="text-xs text-[#737686] mt-0.5">{s.label}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.color}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input
            type="search"
            placeholder="Search by route, driver, trip ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#cbd5e1] bg-white placeholder-[#737686] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'in-transit', 'delayed', 'completed', 'scheduled', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={['h-9 px-3 text-xs font-medium rounded-lg border capitalize transition-colors',
                filter === f ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb]' : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8]'].join(' ')}
            >
              {f === 'all' ? 'All' : f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#e2e8f0]">
                {['Trip ID', 'Route', 'Driver / Vehicle', 'Cargo', 'Distance', 'Started', 'ETA', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-[#737686]">No trips found</td></tr>
              ) : filtered.map((t, i) => {
                const st = statusMap[t.status] ?? { status: 'neutral', label: t.status };
                return (
                  <tr key={t.id} className={`border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors ${i % 2 === 1 ? 'bg-[#fafafa]' : ''}`}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#475569]">{t.id}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-[#2563eb] shrink-0" />
                        <span className="font-medium text-[#131b2e]">{t.from}</span>
                        <span className="text-[#c3c6d7]">→</span>
                        <span className="font-medium text-[#131b2e]">{t.to}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#131b2e]">{t.driver}</p>
                      <p className="text-xs text-[#737686] font-mono">{t.vehicle}</p>
                    </td>
                    <td className="px-4 py-3 text-[#475569]">{t.cargo}</td>
                    <td className="px-4 py-3 text-[#475569]">{t.distance} km</td>
                    <td className="px-4 py-3 text-xs text-[#737686] whitespace-nowrap">{t.started !== '—' ? t.started.split(' ')[0] : '—'}</td>
                    <td className="px-4 py-3 text-xs text-[#737686] whitespace-nowrap">{t.eta !== '—' ? t.eta.split(' ')[0] : '—'}</td>
                    <td className="px-4 py-3"><StatusBadge status={st.status} label={st.label} size="sm" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#f1f5f9]">
          <p className="text-xs text-[#737686]">Showing {filtered.length} of {TRIPS.length} trips</p>
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
