import { useState, useMemo } from 'react';
import { Users, Plus, Search, Star, Phone, Edit2, Trash2, Eye, X, CheckCircle, Mail, IdCard } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';

const INIT_DRIVERS = [
  { id: 'D001', name: 'Arjun Mehta',   phone: '+91 98765 43210', license: 'DL-MH-20180001', experience: 8,  status: 'active',   vehicle: 'V001', trips: 312, rating: 4.8 },
  { id: 'D002', name: 'Priya Sharma',  phone: '+91 98765 43211', license: 'DL-DL-20190012', experience: 5,  status: 'on-leave', vehicle: 'V002', trips: 198, rating: 4.6 },
  { id: 'D003', name: 'Rahul Verma',   phone: '+91 98765 43212', license: 'DL-KA-20200023', experience: 3,  status: 'active',   vehicle: 'V003', trips: 145, rating: 4.7 },
  { id: 'D004', name: 'Sneha Patil',   phone: '+91 98765 43213', license: 'DL-TN-20170034', experience: 9,  status: 'active',   vehicle: 'V004', trips: 421, rating: 4.9 },
  { id: 'D005', name: 'Vikram Singh',  phone: '+91 98765 43214', license: 'DL-GJ-20220045', experience: 2,  status: 'active',   vehicle: 'V005', trips: 87,  rating: 4.5 },
  { id: 'D006', name: 'Deepak Kumar',  phone: '+91 98765 43215', license: 'DL-RJ-20160056', experience: 12, status: 'active',   vehicle: 'V006', trips: 538, rating: 4.9 },
  { id: 'D007', name: 'Meena Joshi',   phone: '+91 98765 43216', license: 'DL-UP-20210067', experience: 4,  status: 'inactive', vehicle: 'V007', trips: 203, rating: 4.4 },
  { id: 'D008', name: 'Suresh Nair',   phone: '+91 98765 43217', license: 'DL-WB-20150078', experience: 15, status: 'on-leave', vehicle: 'V008', trips: 672, rating: 4.7 },
];

const statusMap = {
  'active':   { status: 'success', label: 'Active'   },
  'on-leave': { status: 'warning', label: 'On Leave' },
  'inactive': { status: 'neutral', label: 'Inactive' },
};

const EMPTY_FORM = { name: '', phone: '', license: '', experience: 1, status: 'active', vehicle: '', trips: 0, rating: 4.5 };

const inputCls = 'w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all';

const DriverModal = ({ driver, onClose, onSave }) => {
  const [form, setForm] = useState(driver ?? EMPTY_FORM);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(19,27,46,0.5)' }}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl modal-enter" style={{ border: '1px solid #e2e8f0' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#eff6ff] flex items-center justify-center">
              <Users size={18} className="text-[#2563eb]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#131b2e]">{driver ? 'Edit Driver' : 'Add Driver'}</h3>
              <p className="text-xs text-[#737686]">{driver ? `Editing ${driver.name}` : 'Register a new driver'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#f8fafc] transition-colors" style={{ color: '#94a3b8' }}>
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Full Name *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Arjun Mehta" className={inputCls} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Phone Number</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">License No.</label>
              <input value={form.license} onChange={e => set('license', e.target.value)} placeholder="DL-MH-20180001" className={`${inputCls} font-mono text-xs`} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Experience (yrs)</label>
              <input type="number" value={form.experience} onChange={e => set('experience', +e.target.value)} min={0} max={50} className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)} className={`${inputCls} appearance-none bg-white`}>
                <option value="active">Active</option>
                <option value="on-leave">On Leave</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Rating</label>
              <input type="number" value={form.rating} onChange={e => set('rating', +e.target.value)} min={1} max={5} step={0.1} className={inputCls} />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Assigned Vehicle ID</label>
            <input value={form.vehicle} onChange={e => set('vehicle', e.target.value)} placeholder="V001" className={`${inputCls} font-mono`} />
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4" style={{ borderTop: '1px solid #f1f5f9' }}>
          <button onClick={onClose} className="h-9 px-5 text-sm font-medium rounded-lg border border-[#e2e8f0] text-[#475569] hover:bg-[#f8fafc] transition-colors">Cancel</button>
          <button onClick={() => { if (form.name.trim()) onSave(form); }} className="h-9 px-5 text-sm font-semibold rounded-lg bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors flex items-center gap-2 shadow-sm">
            <CheckCircle size={15} />{driver ? 'Save Changes' : 'Add Driver'}
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfirmDelete = ({ label, onConfirm, onCancel }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(19,27,46,0.5)' }}>
    <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl modal-enter p-6" style={{ border: '1px solid #e2e8f0' }}>
      <div className="w-12 h-12 rounded-full bg-[#fee2e2] flex items-center justify-center mx-auto mb-4">
        <Trash2 size={20} className="text-[#dc2626]" />
      </div>
      <h3 className="text-sm font-bold text-[#131b2e] text-center mb-1">Remove Driver?</h3>
      <p className="text-xs text-[#737686] text-center mb-6">Remove <span className="font-semibold text-[#131b2e]">{label}</span> from the system? This cannot be undone.</p>
      <div className="flex gap-3">
        <button onClick={onCancel} className="flex-1 h-9 text-sm font-medium rounded-lg border border-[#e2e8f0] text-[#475569] hover:bg-[#f8fafc] transition-colors">Cancel</button>
        <button onClick={onConfirm} className="flex-1 h-9 text-sm font-semibold rounded-lg bg-[#dc2626] text-white hover:bg-[#b91c1c] transition-colors">Remove</button>
      </div>
    </div>
  </div>
);

const DriversPage = () => {
  const [drivers, setDrivers]     = useState(INIT_DRIVERS);
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState('all');
  const [modalDriver, setModalDriver] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]         = useState('');

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 2800); };

  const filtered = useMemo(() => drivers.filter(d => {
    const q = search.toLowerCase();
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.license.toLowerCase().includes(q) || d.phone.includes(q);
    const matchFilter = filter === 'all' || d.status === filter;
    return matchSearch && matchFilter;
  }), [drivers, search, filter]);

  const handleSave = form => {
    if (modalDriver && modalDriver !== false) {
      setDrivers(prev => prev.map(d => d.id === modalDriver.id ? { ...d, ...form } : d));
      showToast(`${form.name} updated`);
    } else {
      const newId = `D${String(drivers.length + 1).padStart(3, '0')}`;
      setDrivers(prev => [{ ...form, id: newId }, ...prev]);
      showToast(`${form.name} added`);
    }
    setModalDriver(null);
  };

  const handleDelete = () => {
    setDrivers(prev => prev.filter(d => d.id !== deleteTarget.id));
    showToast(`${deleteTarget.name} removed`);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6 fade-in">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#131b2e] text-white text-sm font-medium rounded-xl shadow-2xl modal-enter">
          <CheckCircle size={16} className="text-[#4ade80]" />{toast}
        </div>
      )}
      {modalDriver !== null && <DriverModal driver={modalDriver || null} onClose={() => setModalDriver(null)} onSave={handleSave} />}
      {deleteTarget && <ConfirmDelete label={deleteTarget.name} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Driver Management</h1>
          <p className="text-sm text-[#737686] mt-0.5">{drivers.length} drivers · {drivers.filter(d => d.status === 'active').length} on shift</p>
        </div>
        <button onClick={() => setModalDriver(false)} className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm">
          <Plus size={16} />Add Driver
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Active',   count: drivers.filter(d => d.status === 'active').length,   color: 'text-[#16a34a]', bg: 'bg-[#dcfce7]', border: 'border-[#bbf7d0]' },
          { label: 'On Leave', count: drivers.filter(d => d.status === 'on-leave').length,  color: 'text-[#d97706]', bg: 'bg-[#fef3c7]', border: 'border-[#fde68a]' },
          { label: 'Inactive', count: drivers.filter(d => d.status === 'inactive').length,  color: 'text-[#475569]', bg: 'bg-[#f1f5f9]', border: 'border-[#e2e8f0]' },
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
          <input type="search" placeholder="Search name, license, phone…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#e2e8f0] bg-white placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'on-leave', 'inactive'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={['h-9 px-4 text-sm font-medium rounded-lg border capitalize transition-all',
                filter === f ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb] font-semibold' : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8]'].join(' ')}>
              {f === 'all' ? 'All Drivers' : f.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Driver cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(d => {
          const st = statusMap[d.status] ?? { status: 'neutral', label: d.status };
          return (
            <div key={d.id} className="bg-white rounded-xl border border-[#e2e8f0] p-5 hover:border-[#2563eb]/30 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
                    {d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#131b2e] leading-tight">{d.name}</p>
                    <p className="text-xs text-[#737686] font-mono mt-0.5">{d.id}</p>
                  </div>
                </div>
                <StatusBadge status={st.status} label={st.label} size="sm" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#475569]">
                  <Phone size={12} className="shrink-0 text-[#94a3b8]" />
                  <span>{d.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-[#475569]">
                  <IdCard size={12} className="shrink-0 text-[#94a3b8]" />
                  <span className="font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-[10px] tracking-wide">{d.license}</span>
                </div>
              </div>

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

              <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setModalDriver(d)} className="flex-1 h-8 text-xs font-semibold bg-[#eff6ff] text-[#2563eb] rounded-lg hover:bg-[#dbeafe] transition-colors flex items-center justify-center gap-1">
                  <Edit2 size={12} />Edit
                </button>
                <button onClick={() => setDeleteTarget(d)} className="h-8 w-8 text-xs font-semibold border border-[#fee2e2] text-[#dc2626] rounded-lg hover:bg-[#fee2e2] transition-colors flex items-center justify-center">
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center gap-2 text-[#94a3b8]">
            <Users size={40} className="text-[#c3c6d7]" />
            <p className="text-sm font-medium text-[#475569]">No drivers found</p>
            <p className="text-xs">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriversPage;
