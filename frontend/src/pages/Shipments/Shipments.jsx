import { useState, useMemo } from 'react';
import { Package, Plus, Search, DollarSign, Eye, Edit2, Trash2 } from 'lucide-react';
import { SHIPMENTS } from '../../constants/mockData';
import StatusBadge from '../../components/ui/StatusBadge';

const statusMap = {
  'in-transit': { status: 'info',    label: 'In Transit' },
  'pending':    { status: 'warning', label: 'Pending'    },
  'delivered':  { status: 'success', label: 'Delivered'  },
  'scheduled':  { status: 'neutral', label: 'Scheduled'  },
};

const ShipmentsPage = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => SHIPMENTS.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q || s.customer.toLowerCase().includes(q) || s.id.toLowerCase().includes(q) || s.origin.toLowerCase().includes(q) || s.dest.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || s.status === filter;
    return matchSearch && matchFilter;
  }), [search, filter]);

  const totalValue = SHIPMENTS.reduce((acc, s) => acc + s.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Shipment Tracking</h1>
          <p className="text-sm text-[#737686] mt-0.5">{SHIPMENTS.length} shipments · ₹{(totalValue/100000).toFixed(1)}L total value</p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm">
          <Plus size={16} />New Shipment
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'In Transit', count: SHIPMENTS.filter(s=>s.status==='in-transit').length, color:'text-[#2563eb] bg-[#eff6ff]' },
          { label: 'Pending',    count: SHIPMENTS.filter(s=>s.status==='pending').length,    color:'text-[#d97706] bg-[#fef3c7]' },
          { label: 'Delivered',  count: SHIPMENTS.filter(s=>s.status==='delivered').length,  color:'text-[#16a34a] bg-[#dcfce7]' },
          { label: 'Total Value',count: `₹${(totalValue/100000).toFixed(1)}L`,              color:'text-[#7c3aed] bg-[#f5f3ff]' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#e2e8f0] p-4">
            <p className={`text-xl font-bold ${s.color.split(' ')[0]}`}>{s.count}</p>
            <p className="text-xs text-[#737686] mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input type="search" placeholder="Search customer, route, ID…" value={search} onChange={e=>setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#cbd5e1] bg-white placeholder-[#737686] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all','in-transit','pending','delivered','scheduled'].map(f => (
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
                {['ID','Customer','Route','Driver / Vehicle','Weight','Value','Date','Status','Actions'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0
                ? <tr><td colSpan={9} className="px-4 py-12 text-center text-sm text-[#737686]">No shipments found</td></tr>
                : filtered.map((s, i) => {
                    const st = statusMap[s.status] ?? { status: 'neutral', label: s.status };
                    return (
                      <tr key={s.id} className={`border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors ${i%2===1?'bg-[#fafafa]':''}`}>
                        <td className="px-4 py-3 font-mono text-xs font-bold text-[#475569]">{s.id}</td>
                        <td className="px-4 py-3 font-medium text-[#131b2e] max-w-[150px]">
                          <p className="truncate">{s.customer}</p>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-[#475569]">{s.origin}</span>
                          <span className="mx-1.5 text-[#c3c6d7]">→</span>
                          <span className="text-[#475569]">{s.dest}</span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-[#131b2e]">{s.driver}</p>
                          <p className="text-xs text-[#737686] font-mono">{s.vehicle}</p>
                        </td>
                        <td className="px-4 py-3 text-[#475569]">{s.weight.toLocaleString()} kg</td>
                        <td className="px-4 py-3 font-semibold text-[#2563eb]">₹{s.value.toLocaleString()}</td>
                        <td className="px-4 py-3 text-xs text-[#737686]">{s.created}</td>
                        <td className="px-4 py-3"><StatusBadge status={st.status} label={st.label} size="sm" /></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button aria-label="View" className="p-1.5 text-[#737686] hover:text-[#2563eb] hover:bg-[#eff6ff] rounded transition-colors"><Eye size={13} /></button>
                            <button aria-label="Edit" className="p-1.5 text-[#737686] hover:text-[#d97706] hover:bg-[#fef3c7] rounded transition-colors"><Edit2 size={13} /></button>
                            <button aria-label="Delete" className="p-1.5 text-[#737686] hover:text-[#dc2626] hover:bg-[#fee2e2] rounded transition-colors"><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#f1f5f9]">
          <p className="text-xs text-[#737686]">Showing {filtered.length} of {SHIPMENTS.length} shipments</p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentsPage;
