import { useState, useMemo } from 'react';
import { Wrench, Plus, Search, AlertTriangle, Calendar, DollarSign } from 'lucide-react';
import { MAINTENANCE } from '../../constants/mockData';
import StatusBadge from '../../components/ui/StatusBadge';

const statusMap = {
  'in-progress': { status: 'info',    label: 'In Progress' },
  'pending':     { status: 'warning', label: 'Pending'     },
  'completed':   { status: 'success', label: 'Completed'   },
  'scheduled':   { status: 'neutral', label: 'Scheduled'   },
};

const priorityMap = {
  high:   'bg-[#fee2e2] text-[#b91c1c]',
  medium: 'bg-[#fef3c7] text-[#b45309]',
  low:    'bg-[#dcfce7] text-[#15803d]',
};

const MaintenancePage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => MAINTENANCE.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch = !q || m.vehicle.toLowerCase().includes(q) || m.plate.toLowerCase().includes(q) || m.type.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || m.status === filter;
    return matchSearch && matchFilter;
  }), [search, filter]);

  const totalCost = MAINTENANCE.reduce((s, m) => s + m.cost, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Maintenance Tracker</h1>
          <p className="text-sm text-[#737686] mt-0.5">{MAINTENANCE.filter(m=>m.status!=='completed').length} open tasks · ₹{totalCost.toLocaleString()} total cost</p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm">
          <Plus size={16} />New Record
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'In Progress', count: MAINTENANCE.filter(m=>m.status==='in-progress').length, icon: Wrench,       bg: 'bg-[#dbeafe]', color: 'text-[#1d4ed8]' },
          { label: 'Pending',     count: MAINTENANCE.filter(m=>m.status==='pending').length,     icon: AlertTriangle, bg: 'bg-[#fef3c7]', color: 'text-[#b45309]' },
          { label: 'Scheduled',   count: MAINTENANCE.filter(m=>m.status==='scheduled').length,   icon: Calendar,      bg: 'bg-[#f1f5f9]', color: 'text-[#475569]' },
          { label: 'Total Cost',  count: `₹${(totalCost/1000).toFixed(0)}K`,                    icon: DollarSign,    bg: 'bg-[#dcfce7]', color: 'text-[#15803d]' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-xl font-bold text-[#131b2e]">{s.count}</p>
              <p className="text-xs text-[#737686]">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input type="search" placeholder="Search vehicle, type…" value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#cbd5e1] bg-white placeholder-[#737686] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all','in-progress','pending','scheduled','completed'].map(f => (
            <button key={f} onClick={()=>setFilter(f)} className={['h-9 px-3 text-xs font-medium rounded-lg border capitalize transition-colors',
              filter===f ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb]' : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8]'].join(' ')}>
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
                {['ID','Vehicle','Type','Mechanic','Scheduled','Cost','Priority','Status'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-[#737686]">No maintenance records found</td></tr>
                : filtered.map((m, i) => {
                    const st = statusMap[m.status] ?? { status: 'neutral', label: m.status };
                    return (
                      <tr key={m.id} className={`border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors ${i%2===1?'bg-[#fafafa]':''}`}>
                        <td className="px-4 py-3 font-mono text-xs font-bold text-[#475569]">{m.id}</td>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-[#131b2e] font-mono text-xs">{m.vehicle}</p>
                          <p className="text-xs text-[#737686]">{m.plate}</p>
                        </td>
                        <td className="px-4 py-3 font-medium text-[#131b2e]">{m.type}</td>
                        <td className="px-4 py-3 text-[#475569]">{m.mechanic}</td>
                        <td className="px-4 py-3 text-xs text-[#737686]">{m.scheduled}</td>
                        <td className="px-4 py-3 font-medium text-[#131b2e]">₹{m.cost.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${priorityMap[m.priority]}`}>{m.priority}</span>
                        </td>
                        <td className="px-4 py-3"><StatusBadge status={st.status} label={st.label} size="sm" /></td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
