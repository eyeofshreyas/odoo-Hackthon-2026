import { useState, useMemo } from 'react';
import { Fuel, Search, Plus, TrendingDown, DollarSign, Droplets } from 'lucide-react';
import { FUEL_LOGS, VEHICLES } from '../../constants/mockData';

const FuelExpensePage = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => FUEL_LOGS.filter((f) => {
    const q = search.toLowerCase();
    return !q || f.vehicle.toLowerCase().includes(q) || f.station.toLowerCase().includes(q);
  }), [search]);

  const totalSpend  = FUEL_LOGS.reduce((s, f) => s + f.amount, 0);
  const totalLiters = FUEL_LOGS.reduce((s, f) => s + f.liters, 0);
  const avgRate     = (totalSpend / totalLiters).toFixed(2);

  const summaryCards = [
    { label: 'Total Spend (MTD)',  value: `₹${(totalSpend/1000).toFixed(1)}K`,  icon: DollarSign, bg: 'bg-[#eff6ff]', color: 'text-[#2563eb]' },
    { label: 'Total Litres',       value: `${totalLiters}L`,                     icon: Droplets,   bg: 'bg-[#dcfce7]', color: 'text-[#16a34a]' },
    { label: 'Avg ₹/Litre',       value: `₹${avgRate}`,                          icon: TrendingDown,bg:'bg-[#fef3c7]', color: 'text-[#d97706]' },
    { label: 'Vehicles Tracked',   value: VEHICLES.length,                        icon: Fuel,       bg: 'bg-[#f1f5f9]', color: 'text-[#475569]' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Fuel & Expenses</h1>
          <p className="text-sm text-[#737686] mt-0.5">{FUEL_LOGS.length} logs this month</p>
        </div>
        <button className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm">
          <Plus size={16} />Log Fuel
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {summaryCards.map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
              <s.icon size={18} className={s.color} />
            </div>
            <div>
              <p className="text-lg font-bold text-[#131b2e]">{s.value}</p>
              <p className="text-xs text-[#737686] leading-tight">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Per-vehicle breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f1f5f9]">
            <h2 className="text-sm font-semibold text-[#131b2e]">Fuel Logs</h2>
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#737686]" />
              <input type="search" placeholder="Search…" value={search} onChange={e=>setSearch(e.target.value)}
                className="h-8 pl-7 pr-3 text-xs rounded-lg border border-[#cbd5e1] bg-white placeholder-[#737686] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]/20 transition-colors" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#e2e8f0]">
                  {['ID','Vehicle','Date','Litres','Rate','Amount','Station'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((f, i) => (
                  <tr key={f.id} className={`border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors ${i%2===1?'bg-[#fafafa]':''}`}>
                    <td className="px-4 py-3 font-mono text-xs text-[#475569]">{f.id}</td>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#131b2e]">{f.vehicle}</td>
                    <td className="px-4 py-3 text-xs text-[#475569]">{f.date}</td>
                    <td className="px-4 py-3 font-medium text-[#131b2e]">{f.liters}L</td>
                    <td className="px-4 py-3 text-[#475569]">₹{f.ratePerL}</td>
                    <td className="px-4 py-3 font-semibold text-[#2563eb]">₹{f.amount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-xs text-[#737686] max-w-[160px] truncate">{f.station}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Per-vehicle cost summary */}
        <div className="bg-white rounded-xl border border-[#e2e8f0] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#f1f5f9]">
            <h2 className="text-sm font-semibold text-[#131b2e]">Cost by Vehicle</h2>
          </div>
          <div className="divide-y divide-[#f1f5f9]">
            {FUEL_LOGS.map((f) => {
              const pct = Math.round((f.amount / totalSpend) * 100);
              return (
                <div key={f.id} className="px-5 py-3">
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-[#131b2e] font-mono">{f.vehicle}</span>
                    <span className="text-[#2563eb] font-semibold">₹{f.amount.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 bg-[#e2e8f0] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2563eb] rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[10px] text-[#737686] mt-1">{pct}% of monthly spend</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelExpensePage;
