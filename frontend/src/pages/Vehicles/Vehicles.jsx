import { useState, useMemo } from 'react';
import { Truck, Plus, Search, Filter, Edit2, Trash2, Eye } from 'lucide-react';
import { VEHICLES } from '../../constants/mockData';
import StatusBadge from '../../components/ui/StatusBadge';

const statusMap = {
  active:      { status: 'success', label: 'Active'      },
  maintenance: { status: 'warning', label: 'Maintenance' },
  idle:        { status: 'neutral', label: 'Idle'        },
};

const VehiclesPage = () => {
  const [search, setSearch]     = useState('');
  const [filter, setFilter]     = useState('all');

  const filtered = useMemo(() => {
    return VEHICLES.filter((v) => {
      const q = search.toLowerCase();
      const matchSearch = !q || v.plate.toLowerCase().includes(q) || v.make.toLowerCase().includes(q) || v.driver.toLowerCase().includes(q);
      const matchFilter = filter === 'all' || v.status === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Vehicle Registry</h1>
          <p className="text-sm text-[#737686] mt-0.5">{VEHICLES.length} vehicles in fleet · {VEHICLES.filter(v=>v.status==='active').length} active</p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm">
          <Plus size={16} />
          Add Vehicle
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input
            type="search"
            placeholder="Search plate, make, driver…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#cbd5e1] bg-white text-[#131b2e] placeholder-[#737686] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'maintenance', 'idle'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                'h-9 px-4 text-sm font-medium rounded-lg border capitalize transition-colors',
                filter === f
                  ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb]'
                  : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8]',
              ].join(' ')}
            >
              {f === 'all' ? 'All Vehicles' : f.charAt(0).toUpperCase() + f.slice(1)}
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
                {['Vehicle ID', 'Plate Number', 'Type / Make', 'Year', 'Assigned Driver', 'Fuel', 'KM', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-[#737686]">
                      <Truck size={36} className="text-[#c3c6d7]" />
                      <p className="text-sm font-medium">No vehicles found</p>
                      <p className="text-xs">Try adjusting your search or filter</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((v, i) => {
                const st = statusMap[v.status] ?? { status: 'neutral', label: v.status };
                const fuelColor = v.fuel >= 60 ? 'text-[#16a34a]' : v.fuel >= 30 ? 'text-[#d97706]' : 'text-[#dc2626]';
                return (
                  <tr key={v.id} className={`border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors ${i % 2 === 1 ? 'bg-[#fafafa]' : ''}`}>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-[#475569]">{v.id}</td>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#131b2e]">{v.plate}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#131b2e]">{v.make}</p>
                      <p className="text-xs text-[#737686]">{v.type}</p>
                    </td>
                    <td className="px-4 py-3 text-[#475569]">{v.year}</td>
                    <td className="px-4 py-3 text-[#131b2e]">{v.driver}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${v.fuel >= 60 ? 'bg-[#16a34a]' : v.fuel >= 30 ? 'bg-[#d97706]' : 'bg-[#dc2626]'}`}
                            style={{ width: `${v.fuel}%` }}
                          />
                        </div>
                        <span className={`text-xs font-semibold ${fuelColor}`}>{v.fuel}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#475569]">{v.km.toLocaleString()}</td>
                    <td className="px-4 py-3"><StatusBadge status={st.status} label={st.label} size="sm" /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button aria-label="View vehicle" className="p-1.5 text-[#737686] hover:text-[#2563eb] hover:bg-[#eff6ff] rounded transition-colors"><Eye size={14} /></button>
                        <button aria-label="Edit vehicle" className="p-1.5 text-[#737686] hover:text-[#d97706] hover:bg-[#fef3c7] rounded transition-colors"><Edit2 size={14} /></button>
                        <button aria-label="Delete vehicle" className="p-1.5 text-[#737686] hover:text-[#dc2626] hover:bg-[#fee2e2] rounded transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#f1f5f9] flex items-center justify-between">
          <p className="text-xs text-[#737686]">Showing {filtered.length} of {VEHICLES.length} vehicles</p>
          <div className="flex gap-1">
            {[1].map((p) => (
              <button key={p} className="w-7 h-7 text-xs font-semibold bg-[#2563eb] text-white rounded">{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;
