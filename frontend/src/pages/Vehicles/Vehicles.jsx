import { useState, useMemo } from 'react';
import { Truck, Plus, Search, Edit2, Trash2, Eye, X, CheckCircle } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';

/* ── Initial mock data (local state) ── */
const INIT_VEHICLES = [
  { id: 'V001', plate: 'MH-12-AB-1234', type: 'Heavy Truck',  make: 'Tata Prima',     year: 2021, driver: 'Arjun Mehta',  status: 'active',      fuel: 78,  km: 142300 },
  { id: 'V002', plate: 'DL-01-CD-5678', type: 'Medium Truck', make: 'Ashok Leyland',  year: 2020, driver: 'Priya Sharma', status: 'maintenance', fuel: 45,  km: 98700  },
  { id: 'V003', plate: 'KA-03-EF-9012', type: 'Light Van',    make: 'Mahindra Bolero',year: 2022, driver: 'Rahul Verma',  status: 'active',      fuel: 92,  km: 54200  },
  { id: 'V004', plate: 'TN-07-GH-3456', type: 'Heavy Truck',  make: 'BharatBenz',     year: 2019, driver: 'Sneha Patil',  status: 'idle',        fuel: 60,  km: 201500 },
  { id: 'V005', plate: 'GJ-15-IJ-7890', type: 'Container',    make: 'Volvo FH',       year: 2023, driver: 'Vikram Singh', status: 'active',      fuel: 55,  km: 32100  },
  { id: 'V006', plate: 'RJ-14-KL-2345', type: 'Tanker',       make: 'ISUZU NQR',      year: 2020, driver: 'Deepak Kumar', status: 'active',      fuel: 83,  km: 176400 },
  { id: 'V007', plate: 'UP-32-MN-6789', type: 'Mini Truck',   make: 'Tata Ace',       year: 2022, driver: 'Meena Joshi',  status: 'idle',        fuel: 71,  km: 43900  },
  { id: 'V008', plate: 'WB-06-OP-0123', type: 'Heavy Truck',  make: 'Eicher Pro',     year: 2018, driver: 'Suresh Nair',  status: 'maintenance', fuel: 30,  km: 287600 },
];

const STATUS_OPTS = ['active', 'maintenance', 'idle'];
const TYPE_OPTS   = ['Heavy Truck', 'Medium Truck', 'Light Van', 'Container', 'Tanker', 'Mini Truck'];

const statusMap = {
  active:      { status: 'success', label: 'Active'      },
  maintenance: { status: 'warning', label: 'Maintenance' },
  idle:        { status: 'neutral', label: 'Idle'        },
};

const EMPTY_FORM = { plate: '', type: 'Heavy Truck', make: '', year: new Date().getFullYear(), driver: '', status: 'active', fuel: 100, km: 0 };

/* ── Modal Component ── */
const VehicleModal = ({ vehicle, onClose, onSave }) => {
  const [form, setForm] = useState(vehicle ?? EMPTY_FORM);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.plate.trim() || !form.make.trim() || !form.driver.trim()) return;
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(19,27,46,0.5)' }}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl modal-enter" style={{ border: '1px solid #e2e8f0' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#eff6ff] flex items-center justify-center">
              <Truck size={18} className="text-[#2563eb]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#131b2e]">{vehicle ? 'Edit Vehicle' : 'Add Vehicle'}</h3>
              <p className="text-xs text-[#737686]">{vehicle ? `Editing ${vehicle.plate}` : 'Register a new fleet vehicle'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#f8fafc] transition-colors" style={{ color: '#94a3b8' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Plate Number *</label>
              <input value={form.plate} onChange={e => set('plate', e.target.value)} placeholder="MH-12-AB-1234"
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] font-mono focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Type</label>
              <select value={form.type} onChange={e => set('type', e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all appearance-none bg-white">
                {TYPE_OPTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Make / Model *</label>
              <input value={form.make} onChange={e => set('make', e.target.value)} placeholder="Tata Prima"
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Year</label>
              <input type="number" value={form.year} onChange={e => set('year', +e.target.value)} min={2000} max={2030}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Assigned Driver *</label>
            <input value={form.driver} onChange={e => set('driver', e.target.value)} placeholder="Driver name"
              className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all appearance-none bg-white capitalize">
                {STATUS_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Fuel %</label>
              <input type="number" value={form.fuel} onChange={e => set('fuel', +e.target.value)} min={0} max={100}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all" />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Odometer km</label>
              <input type="number" value={form.km} onChange={e => set('km', +e.target.value)} min={0}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4" style={{ borderTop: '1px solid #f1f5f9' }}>
          <button onClick={onClose} className="h-9 px-5 text-sm font-medium rounded-lg border border-[#e2e8f0] text-[#475569] hover:bg-[#f8fafc] transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="h-9 px-5 text-sm font-semibold rounded-lg bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors flex items-center gap-2 shadow-sm">
            <CheckCircle size={15} />
            {vehicle ? 'Save Changes' : 'Add Vehicle'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Confirm Delete Dialog ── */
const ConfirmDelete = ({ label, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(19,27,46,0.5)' }}>
    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl modal-enter p-6" style={{ border: '1px solid #e2e8f0' }}>
      <div className="w-12 h-12 rounded-full bg-[#fee2e2] flex items-center justify-center mx-auto mb-4">
        <Trash2 size={20} className="text-[#dc2626]" />
      </div>
      <h3 className="text-sm font-bold text-[#131b2e] text-center mb-1">Delete Vehicle?</h3>
      <p className="text-xs text-[#737686] text-center mb-6">Are you sure you want to remove <span className="font-semibold text-[#131b2e]">{label}</span>? This action cannot be undone.</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 h-9 text-sm font-medium rounded-lg border border-[#e2e8f0] text-[#475569] hover:bg-[#f8fafc] transition-colors">Cancel</button>
        <button onClick={onConfirm} className="flex-1 h-9 text-sm font-semibold rounded-lg bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors">Delete</button>
      </div>
    </div>
  </div>
);

/* ── Main Page ── */
const VehiclesPage = () => {
  const [vehicles, setVehicles]   = useState(INIT_VEHICLES);
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState('all');
  const [modalVehicle, setModalVehicle] = useState(null);   // null=closed, false=new, obj=edit
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]         = useState('');

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 2800); };

  const filtered = useMemo(() => vehicles.filter(v => {
    const q = search.toLowerCase();
    const matchSearch = !q || v.plate.toLowerCase().includes(q) || v.make.toLowerCase().includes(q) || v.driver.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || v.status === filter;
    return matchSearch && matchFilter;
  }), [vehicles, search, filter]);

  const handleSave = (form) => {
    if (modalVehicle && modalVehicle !== false) {
      setVehicles(prev => prev.map(v => v.id === modalVehicle.id ? { ...v, ...form } : v));
      showToast(`Vehicle ${form.plate} updated`);
    } else {
      const newId = `V${String(vehicles.length + 1).padStart(3, '0')}`;
      setVehicles(prev => [{ ...form, id: newId }, ...prev]);
      showToast(`Vehicle ${form.plate} added`);
    }
    setModalVehicle(null);
  };

  const handleDelete = () => {
    setVehicles(prev => prev.filter(v => v.id !== deleteTarget.id));
    showToast(`Vehicle ${deleteTarget.plate} removed`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#131b2e] text-white text-sm font-medium rounded-xl shadow-2xl modal-enter">
          <CheckCircle size={16} className="text-[#4ade80]" />{toast}
        </div>
      )}

      {/* Modals */}
      {modalVehicle !== null && (
        <VehicleModal vehicle={modalVehicle || null} onClose={() => setModalVehicle(null)} onSave={handleSave} />
      )}
      {deleteTarget && (
        <ConfirmDelete label={deleteTarget.plate} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Vehicle Registry</h1>
          <p className="text-sm text-[#737686] mt-0.5">{vehicles.length} vehicles in fleet · {vehicles.filter(v => v.status === 'active').length} active</p>
        </div>
        <button
          onClick={() => setModalVehicle(false)}
          className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm shadow-[#2563eb]/20"
        >
          <Plus size={16} />Add Vehicle
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active',      count: vehicles.filter(v => v.status === 'active').length,      color: 'text-[#16a34a]', bg: 'bg-[#dcfce7]', border: 'border-[#bbf7d0]' },
          { label: 'Maintenance', count: vehicles.filter(v => v.status === 'maintenance').length,  color: 'text-[#d97706]', bg: 'bg-[#fef3c7]', border: 'border-[#fde68a]' },
          { label: 'Idle',        count: vehicles.filter(v => v.status === 'idle').length,         color: 'text-[#475569]', bg: 'bg-[#f1f5f9]', border: 'border-[#e2e8f0]' },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border ${s.border} ${s.bg} px-4 py-3 flex items-center justify-between`}>
            <span className="text-sm font-medium text-[#475569]">{s.label}</span>
            <span className={`text-xl font-bold ${s.color}`}>{s.count}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="search"
            placeholder="Search plate, make, driver…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#e2e8f0] bg-white text-[#131b2e] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'maintenance', 'idle'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={[
                'h-9 px-4 text-sm font-medium rounded-lg border capitalize transition-all',
                filter === f
                  ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb] font-semibold'
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
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                {['Vehicle ID', 'Plate Number', 'Type / Make', 'Year', 'Assigned Driver', 'Fuel', 'Odometer', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
                      <Truck size={36} className="text-[#c3c6d7]" />
                      <p className="text-sm font-medium text-[#475569]">No vehicles found</p>
                      <p className="text-xs">Try adjusting your search or filter</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((v, i) => {
                const st = statusMap[v.status] ?? { status: 'neutral', label: v.status };
                const fuelColor = v.fuel >= 60 ? 'text-[#16a34a]' : v.fuel >= 30 ? 'text-[#d97706]' : 'text-[#dc2626]';
                const fuelBg    = v.fuel >= 60 ? 'bg-[#16a34a]'    : v.fuel >= 30 ? 'bg-[#d97706]'    : 'bg-[#dc2626]';
                return (
                  <tr key={v.id} className={`border-b border-[#f1f5f9] last:border-0 hover:bg-[#fafbff] transition-colors ${i % 2 === 1 ? 'bg-[#fafafa]' : ''}`}>
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
                          <div className={`h-full rounded-full ${fuelBg}`} style={{ width: `${v.fuel}%` }} />
                        </div>
                        <span className={`text-xs font-semibold ${fuelColor}`}>{v.fuel}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#475569]">{v.km.toLocaleString()} km</td>
                    <td className="px-4 py-3"><StatusBadge status={st.status} label={st.label} size="sm" /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalVehicle(v)} aria-label="Edit vehicle" title="Edit" className="p-1.5 text-[#737686] hover:text-[#d97706] hover:bg-[#fef3c7] rounded-lg transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => setDeleteTarget(v)} aria-label="Delete vehicle" title="Delete" className="p-1.5 text-[#737686] hover:text-[#dc2626] hover:bg-[#fee2e2] rounded-lg transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #f1f5f9' }}>
          <p className="text-xs text-[#737686]">Showing <span className="font-semibold">{filtered.length}</span> of <span className="font-semibold">{vehicles.length}</span> vehicles</p>
          <div className="flex gap-1">
            <button className="w-7 h-7 text-xs font-semibold bg-[#2563eb] text-white rounded-lg">1</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclesPage;
