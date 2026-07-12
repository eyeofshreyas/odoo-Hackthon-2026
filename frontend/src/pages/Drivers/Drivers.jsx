import { useState, useMemo } from 'react';
import { Users, Plus, Search, Phone, Edit2, Trash2, X, CheckCircle, IdCard, ShieldCheck, CalendarClock } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import useDrivers from '../../hooks/useDrivers';
import { DRIVER_STATUS, DRIVER_STATUS_OPTIONS, DRIVER_STATUS_BADGE } from '../../constants/driverStatus';

const EMPTY_FORM = { name: '', contactNumber: '', licenseNumber: '', licenseCategory: '', licenseExpiryDate: '', safetyScore: 80 };

const inputCls = 'w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all disabled:bg-[#f8fafc] disabled:text-[#94a3b8]';

const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : '');

const DriverModal = ({ driver, onClose, onSave }) => {
  const [form, setForm] = useState(driver
    ? { ...driver, licenseExpiryDate: toDateInput(driver.licenseExpiryDate) }
    : EMPTY_FORM);
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
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Contact Number *</label>
              <input value={form.contactNumber} onChange={e => set('contactNumber', e.target.value)} placeholder="+91 98765 43210" className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">License No. *</label>
              <input value={form.licenseNumber} onChange={e => set('licenseNumber', e.target.value)} placeholder="DL-MH-20180001"
                disabled={!!driver} className={`${inputCls} font-mono text-xs`} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">License Category *</label>
              <input value={form.licenseCategory} onChange={e => set('licenseCategory', e.target.value)} placeholder="LMV" className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">License Expiry *</label>
              <input type="date" value={form.licenseExpiryDate} onChange={e => set('licenseExpiryDate', e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Safety Score</label>
              <input type="number" value={form.safetyScore} onChange={e => set('safetyScore', +e.target.value)} min={0} max={100} className={inputCls} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4" style={{ borderTop: '1px solid #f1f5f9' }}>
          <button onClick={onClose} className="h-9 px-5 text-sm font-medium rounded-lg border border-[#e2e8f0] text-[#475569] hover:bg-[#f8fafc] transition-colors">Cancel</button>
          <button
            onClick={() => { if (form.name.trim() && form.licenseNumber.trim() && form.licenseCategory.trim() && form.licenseExpiryDate) onSave(form); }}
            className="h-9 px-5 text-sm font-semibold rounded-lg bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors flex items-center gap-2 shadow-sm">
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
  const { drivers, isLoading, error, createDriver, updateDriver, deleteDriver } = useDrivers();
  const [search, setSearch]       = useState('');
  const [filter, setFilter]       = useState('all');
  const [modalDriver, setModalDriver] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast]         = useState('');

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 2800); };

  const filtered = useMemo(() => drivers.filter(d => {
    const q = search.toLowerCase();
    const matchSearch = !q
      || d.name.toLowerCase().includes(q)
      || d.licenseNumber.toLowerCase().includes(q)
      || d.contactNumber.includes(q);
    const matchFilter = filter === 'all' || d.status === filter;
    return matchSearch && matchFilter;
  }), [drivers, search, filter]);

  const handleSave = async (form) => {
    try {
      if (modalDriver) {
        await updateDriver(modalDriver._id, {
          name: form.name,
          licenseCategory: form.licenseCategory,
          licenseExpiryDate: form.licenseExpiryDate,
          contactNumber: form.contactNumber,
          safetyScore: form.safetyScore,
        });
        showToast(`${form.name} updated`);
      } else {
        await createDriver({
          name: form.name,
          licenseNumber: form.licenseNumber,
          licenseCategory: form.licenseCategory,
          licenseExpiryDate: form.licenseExpiryDate,
          contactNumber: form.contactNumber,
          safetyScore: form.safetyScore,
        });
        showToast(`${form.name} added`);
      }
      setModalDriver(null);
    } catch (err) {
      showToast(err.response?.data?.message ?? 'Something went wrong');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDriver(deleteTarget._id);
      showToast(`${deleteTarget.name} removed`);
    } catch (err) {
      showToast(err.response?.data?.message ?? 'Failed to remove driver');
    } finally {
      setDeleteTarget(null);
    }
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
          <p className="text-sm text-[#737686] mt-0.5">{drivers.length} drivers · {drivers.filter(d => d.status === DRIVER_STATUS.AVAILABLE).length} available</p>
        </div>
        <button onClick={() => setModalDriver(false)} className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm">
          <Plus size={16} />Add Driver
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#991b1b]">{error}</div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {DRIVER_STATUS_OPTIONS.map(s => {
          const badge = DRIVER_STATUS_BADGE[s];
          return (
            <div key={s} className="rounded-xl border border-[#e2e8f0] bg-white px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-[#475569]">{badge.label}</span>
              <span className="text-xl font-bold text-[#131b2e]">{drivers.filter(d => d.status === s).length}</span>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input type="search" placeholder="Search name, license, phone…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#e2e8f0] bg-white placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...DRIVER_STATUS_OPTIONS].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={['h-9 px-4 text-sm font-medium rounded-lg border capitalize transition-all',
                filter === f ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb] font-semibold' : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8]'].join(' ')}>
              {f === 'all' ? 'All Drivers' : f}
            </button>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="py-16 flex items-center justify-center text-sm text-[#737686]">Loading drivers…</div>
      )}

      {/* Driver cards */}
      {!isLoading && (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(d => {
          const badge = DRIVER_STATUS_BADGE[d.status] ?? { status: 'neutral', label: d.status };
          const expired = new Date(d.licenseExpiryDate) < new Date();
          return (
            <div key={d._id} className="bg-white rounded-xl border border-[#e2e8f0] p-5 hover:border-[#2563eb]/30 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>
                    {d.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#131b2e] leading-tight">{d.name}</p>
                    <p className="text-xs text-[#737686] font-mono mt-0.5">#{d._id.slice(-6).toUpperCase()}</p>
                  </div>
                </div>
                <StatusBadge status={badge.status} label={badge.label} size="sm" />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#475569]">
                  <Phone size={12} className="shrink-0 text-[#94a3b8]" />
                  <span>{d.contactNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-[#475569]">
                  <IdCard size={12} className="shrink-0 text-[#94a3b8]" />
                  <span className="font-mono bg-[#f1f5f9] px-2 py-0.5 rounded text-[10px] tracking-wide">{d.licenseNumber}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#f1f5f9] grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-sm font-bold text-[#131b2e]">{d.licenseCategory}</p>
                  <p className="text-[10px] text-[#737686] uppercase tracking-wide">Category</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-0.5">
                    <ShieldCheck size={10} className="text-[#16a34a]" />
                    <p className="text-sm font-bold text-[#131b2e]">{d.safetyScore}</p>
                  </div>
                  <p className="text-[10px] text-[#737686] uppercase tracking-wide">Safety</p>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-0.5">
                    <CalendarClock size={10} className={expired ? 'text-[#dc2626]' : 'text-[#94a3b8]'} />
                    <p className={`text-sm font-bold ${expired ? 'text-[#dc2626]' : 'text-[#131b2e]'}`}>{toDateInput(d.licenseExpiryDate)}</p>
                  </div>
                  <p className="text-[10px] text-[#737686] uppercase tracking-wide">Expires</p>
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
      )}
    </div>
  );
};

export default DriversPage;
