import { useState, useMemo } from 'react';
import { Route, Plus, Search, MapPin, Clock, Edit2, Trash2 } from 'lucide-react';
import { ROUTES } from '../../constants/mockData';
import StatusBadge from '../../components/ui/StatusBadge';

const RoutesPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => ROUTES.filter((r) => {
    const q = search.toLowerCase();
    const matchSearch = !q || r.name.toLowerCase().includes(q) || r.from.toLowerCase().includes(q) || r.to.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || r.status === filter;
    return matchSearch && matchFilter;
  }), [search, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Route Management</h1>
          <p className="text-sm text-[#737686] mt-0.5">{ROUTES.filter(r=>r.status==='active').length} active routes · {ROUTES.reduce((s,r)=>s+r.trips,0)} total trips</p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm">
          <Plus size={16} />Add Route
        </button>
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input type="search" placeholder="Search routes…" value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#cbd5e1] bg-white placeholder-[#737686] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-colors" />
        </div>
        <div className="flex gap-2">
          {['all','active','inactive'].map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={['h-9 px-4 text-sm font-medium rounded-lg border capitalize transition-colors',
              filter===f ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb]' : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8]'].join(' ')}>
              {f === 'all' ? 'All Routes' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Route cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(r => (
          <div key={r.id} className="bg-white rounded-xl border border-[#e2e8f0] p-5 hover:border-[#2563eb]/30 hover:shadow-md transition-all">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-sm font-semibold text-[#131b2e] leading-tight">{r.name}</p>
                <p className="text-xs text-[#737686] font-mono mt-0.5">{r.id}</p>
              </div>
              <StatusBadge status={r.status === 'active' ? 'success' : 'neutral'} label={r.status === 'active' ? 'Active' : 'Inactive'} size="sm" />
            </div>

            {/* Route visual */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1.5 text-sm">
                <MapPin size={14} className="text-[#2563eb] shrink-0" />
                <span className="font-medium text-[#131b2e]">{r.from}</span>
              </div>
              <div className="flex-1 border-t-2 border-dashed border-[#c3c6d7]" />
              <div className="flex items-center gap-1.5 text-sm">
                <MapPin size={14} className="text-[#dc2626] shrink-0" />
                <span className="font-medium text-[#131b2e]">{r.to}</span>
              </div>
            </div>

            {/* Waypoints */}
            {r.waypoints.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {r.waypoints.map(w => (
                  <span key={w} className="text-[10px] font-medium bg-[#f2f3ff] text-[#004ac6] border border-[#c3c6d7] px-2 py-0.5 rounded-full">{w}</span>
                ))}
              </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-[#f1f5f9]">
              <div>
                <p className="text-sm font-bold text-[#131b2e]">{r.distance}</p>
                <p className="text-[10px] text-[#737686] uppercase tracking-wide">km</p>
              </div>
              <div className="border-x border-[#f1f5f9]">
                <p className="text-sm font-bold text-[#131b2e]">{r.duration}</p>
                <p className="text-[10px] text-[#737686] uppercase tracking-wide">Duration</p>
              </div>
              <div>
                <p className="text-sm font-bold text-[#131b2e]">{r.trips}</p>
                <p className="text-[10px] text-[#737686] uppercase tracking-wide">Trips</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-2">
              <button className="flex-1 h-8 text-xs font-semibold bg-[#eff6ff] text-[#2563eb] rounded-lg hover:bg-[#dbeafe] transition-colors flex items-center justify-center gap-1">
                <Edit2 size={12} />Edit
              </button>
              <button className="flex-1 h-8 text-xs font-semibold border border-[#fee2e2] text-[#dc2626] rounded-lg hover:bg-[#fee2e2] transition-colors flex items-center justify-center gap-1">
                <Trash2 size={12} />Delete
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center gap-2 text-[#737686]">
            <Route size={40} className="text-[#c3c6d7]" />
            <p className="text-sm font-medium">No routes found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutesPage;
