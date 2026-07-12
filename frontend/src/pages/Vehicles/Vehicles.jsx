import { useState, useMemo } from 'react';
import { Truck, Plus, Search, Edit2, Trash2, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import useVehicles from '../../hooks/useVehicles';
import { VEHICLE_STATUS_OPTIONS, VEHICLE_STATUS_BADGE } from '../../constants/vehicleStatus';

const EMPTY_FORM = {
  registrationNumber: '',
  vehicleName: '',
  model: '',
  type: '',
  region: '',
  maxLoadCapacity: '',
  odometer: '',
  acquisitionCost: '',
};

// Stat-row color per badge status (mirrors StatusBadge's palette).
const STAT_COLORS = {
  success: { color: 'text-[#16a34a]', bg: 'bg-[#dcfce7]', border: 'border-[#bbf7d0]' },
  info: { color: 'text-[#1e40af]', bg: 'bg-[#dbeafe]', border: 'border-[#bfdbfe]' },
  warning: { color: 'text-[#d97706]', bg: 'bg-[#fef3c7]', border: 'border-[#fde68a]' },
  neutral: { color: 'text-[#475569]', bg: 'bg-[#f1f5f9]', border: 'border-[#e2e8f0]' },
};

/* ── Modal Component ── */
const VehicleModal = ({ vehicle, onClose, onSave }) => {
  const isEdit = Boolean(vehicle);
  const [form, setForm] = useState(vehicle ?? EMPTY_FORM);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.registrationNumber.trim() || !form.vehicleName.trim() || !form.model.trim() || !form.type.trim() || !form.region.trim()) return;
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
              <h3 className="text-sm font-bold text-[#131b2e]">{isEdit ? 'Edit Vehicle' : 'Add Vehicle'}</h3>
              <p className="text-xs text-[#737686]">{isEdit ? `Editing ${vehicle.registrationNumber}` : 'Register a new fleet vehicle'}</p>
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
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Registration Number *</label>
              <input
                value={form.registrationNumber}
                onChange={(e) => set('registrationNumber', e.target.value)}
                placeholder="MH-12-AB-1234"
                disabled={isEdit}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] font-mono focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all disabled:bg-[#f8fafc] disabled:text-[#94a3b8]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Type *</label>
              <input
                value={form.type}
                onChange={(e) => set('type', e.target.value)}
                placeholder="Heavy Truck"
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Vehicle Name *</label>
              <input
                value={form.vehicleName}
                onChange={(e) => set('vehicleName', e.target.value)}
                placeholder="Tata Prima"
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Model *</label>
              <input
                value={form.model}
                onChange={(e) => set('model', e.target.value)}
                placeholder="Prima LX 2825"
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Region *</label>
            <input
              value={form.region}
              onChange={(e) => set('region', e.target.value)}
              placeholder="West"
              className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Load Capacity (kg)</label>
              <input
                type="number"
                value={form.maxLoadCapacity}
                onChange={(e) => set('maxLoadCapacity', +e.target.value)}
                min={0}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Odometer (km)</label>
              <input
                type="number"
                value={form.odometer}
                onChange={(e) => set('odometer', +e.target.value)}
                min={0}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Acquisition Cost</label>
              <input
                type="number"
                value={form.acquisitionCost}
                onChange={(e) => set('acquisitionCost', +e.target.value)}
                min={0}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              />
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
            {isEdit ? 'Save Changes' : 'Add Vehicle'}
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
  const { vehicles, isLoading, error, createVehicle, updateVehicle, deleteVehicle } = useVehicles();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [modalVehicle, setModalVehicle] = useState(null); // null=closed, false=new, obj=edit
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };

  const filtered = useMemo(() => vehicles.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch = !q
      || v.registrationNumber.toLowerCase().includes(q)
      || v.vehicleName.toLowerCase().includes(q)
      || v.model.toLowerCase().includes(q);
    const matchFilter = filter === 'all' || v.status === filter;
    return matchSearch && matchFilter;
  }), [vehicles, search, filter]);

  const handleSave = async (form) => {
    try {
      if (modalVehicle && modalVehicle !== false) {
        const { registrationNumber: _registrationNumber, ...editable } = form;
        await updateVehicle(modalVehicle._id, editable);
        showToast(`Vehicle ${form.registrationNumber} updated`);
      } else {
        await createVehicle(form);
        showToast(`Vehicle ${form.registrationNumber} added`);
      }
      setModalVehicle(null);
    } catch (err) {
      showToast(err.response?.data?.message ?? 'Failed to save vehicle', 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteVehicle(deleteTarget._id);
      showToast(`Vehicle ${deleteTarget.registrationNumber} removed`);
    } catch (err) {
      showToast(err.response?.data?.message ?? 'Failed to delete vehicle', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#131b2e] text-white text-sm font-medium rounded-xl shadow-2xl modal-enter">
          {toast.type === 'error'
            ? <AlertCircle size={16} className="text-[#f87171]" />
            : <CheckCircle size={16} className="text-[#4ade80]" />}
          {toast.message}
        </div>
      )}

      {/* Modals */}
      {modalVehicle !== null && (
        <VehicleModal vehicle={modalVehicle || null} onClose={() => setModalVehicle(null)} onSave={handleSave} />
      )}
      {deleteTarget && (
        <ConfirmDelete label={deleteTarget.registrationNumber} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} />
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Vehicle Registry</h1>
          <p className="text-sm text-[#737686] mt-0.5">
            {vehicles.length} vehicles in fleet · {vehicles.filter((v) => v.status === 'Available').length} available
          </p>
        </div>
        <button
          onClick={() => setModalVehicle(false)}
          className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm shadow-[#2563eb]/20"
        >
          <Plus size={16} />Add Vehicle
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">
          <AlertCircle size={16} />{error}
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {VEHICLE_STATUS_OPTIONS.map((s) => {
          const badge = VEHICLE_STATUS_BADGE[s];
          const c = STAT_COLORS[badge.status] ?? STAT_COLORS.neutral;
          return (
            <div key={s} className={`rounded-xl border ${c.border} ${c.bg} px-4 py-3 flex items-center justify-between`}>
              <span className="text-sm font-medium text-[#475569]">{badge.label}</span>
              <span className={`text-xl font-bold ${c.color}`}>{vehicles.filter((v) => v.status === s).length}</span>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="search"
            placeholder="Search registration, name, model…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#e2e8f0] bg-white text-[#131b2e] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...VEHICLE_STATUS_OPTIONS].map((f) => (
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
              {f === 'all' ? 'All Vehicles' : f}
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
                {['Registration', 'Vehicle / Model', 'Type', 'Region', 'Load Capacity', 'Odometer', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
                      <Loader2 size={28} className="animate-spin text-[#2563eb]" />
                      <p className="text-sm font-medium text-[#475569]">Loading vehicles…</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center">
                    <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
                      <Truck size={36} className="text-[#c3c6d7]" />
                      <p className="text-sm font-medium text-[#475569]">No vehicles found</p>
                      <p className="text-xs">Try adjusting your search or filter</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.map((v, i) => {
                const badge = VEHICLE_STATUS_BADGE[v.status] ?? { status: 'neutral', label: v.status };
                return (
                  <tr key={v._id} className={`border-b border-[#f1f5f9] last:border-0 hover:bg-[#fafbff] transition-colors ${i % 2 === 1 ? 'bg-[#fafafa]' : ''}`}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#131b2e]">{v.registrationNumber}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#131b2e]">{v.vehicleName}</p>
                      <p className="text-xs text-[#737686]">{v.model}</p>
                    </td>
                    <td className="px-4 py-3 text-[#475569]">{v.type}</td>
                    <td className="px-4 py-3 text-[#475569]">{v.region}</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#475569]">{v.maxLoadCapacity?.toLocaleString()} kg</td>
                    <td className="px-4 py-3 font-mono text-xs text-[#475569]">{v.odometer?.toLocaleString()} km</td>
                    <td className="px-4 py-3"><StatusBadge status={badge.status} label={badge.label} size="sm" /></td>
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
