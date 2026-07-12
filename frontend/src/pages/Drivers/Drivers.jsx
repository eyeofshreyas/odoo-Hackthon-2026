import { useState, useMemo } from 'react';
import { Users, Plus, Search, Star, Phone, Edit2, Trash2, Eye } from 'lucide-react';
import { DRIVERS } from '../../constants/mockData';
import StatusBadge from '../../components/ui/StatusBadge';

const statusMap = {
  'active':   { status: 'success', label: 'Active'    },
  'on-leave': { status: 'warning', label: 'On Leave'  },
  'inactive': { status: 'neutral', label: 'Inactive'  },
};

const DriversPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => DRIVERS.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.license.toLowerCase().includes(q) || d.phone.includes(q);
    const matchFilter = filter === 'all' || d.status === filter;
    return matchSearch && matchFilter;
  }), [search, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Driver Management</h1>
          <p className="text-sm text-[#737686] mt-0.5">{DRIVERS.length} drivers · {DRIVERS.filter(d=>d.status==='active').length} on shift</p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm">
          <Plus size={16} />Add Driver
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input
            type="search"
            placeholder="Search name, license, phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#cbd5e1] bg-white placeholder-[#737686] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'on-leave', 'inactive'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={['h-9 px-4 text-sm font-medium rounded-lg border capitalize transition-colors',
                filter === f ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb]' : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8]'].join(' ')}
            >
              {f === 'all' ? 'All' : f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Driver cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((d) => {
          const st = statusMap[d.status] ?? { status: 'neutral', label: d.status };
          return (
            <div key={d.id} className="bg-white rounded-xl border border-[#e2e8f0] p-5 hover:border-[#2563eb]/30 hover:shadow-md transition-all">
              {/* Avatar + status */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563eb] to-[#004ac6] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#131b2e] leading-tight">{d.name}</p>
                    <p className="text-xs text-[#737686] font-mono mt-0.5">{d.id}</p>
                  </div>
                </div>
                <StatusBadge status={st.status} label={st.label} size="sm" />
              </div>

              {/* Details */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#475569]">
                  <Phone size={12} className="shrink-0" />
                  <span>{d.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#475569]">
                  <span className="font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-[10px]">{d.license}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 pt-4 border-t border-[#f1f5f9] grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm font-bold text-[#131b2e]">{d.trips}</p>
                  <p className="text-[10px] text-[#737686] uppercase tracking-wide">Trips</p>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#131b2e]">{d.experience}y</p>
                  <p className="text-[10px] text-[#737686] uppercase tracking-wide">Exp.</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-0.5">
                    <Star size={10} className="text-[#eab308] fill-[#eab308]" />
                    <p className="text-sm font-bold text-[#131b2e]">{d.rating}</p>
                  </div>
                  <p className="text-[10px] text-[#737686] uppercase tracking-wide">Rating</p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 h-8 text-xs font-semibold border border-[#e2e8f0] text-[#475569] rounded-lg hover:bg-[#f8fafc] transition-colors flex items-center justify-center gap-1">
                  <Eye size={12} />View
                </button>
                <button className="flex-1 h-8 text-xs font-semibold bg-[#eff6ff] text-[#2563eb] rounded-lg hover:bg-[#dbeafe] transition-colors flex items-center justify-center gap-1">
                  <Edit2 size={12} />Edit
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center gap-2 text-[#737686]">
            <Users size={40} className="text-[#c3c6d7]" />
            <p className="text-sm font-medium">No drivers found</p>
            <p className="text-xs">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriversPage;
