import { useState, useMemo } from 'react';
import { Plus, Search, AlertCircle, Loader2, Send, CheckCircle2, XCircle } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import useShipments from '../../hooks/useShipments';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';
import { SHIPMENT_STATUS, SHIPMENT_STATUS_OPTIONS, SHIPMENT_STATUS_BADGE } from '../../constants/shipmentStatus';
import CreateTripModal from '../Trips/CreateTripModal';

const ShipmentsPage = () => {
  const { shipments, isLoading, error, createTrip, dispatchTrip, completeTrip, cancelTrip } = useShipments();
  const { user } = useAuth();
  const canManage = user?.role === ROLES.FLEET_MANAGER;

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [busyId, setBusyId] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2800);
  };

  const filtered = useMemo(() => shipments.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch = !q
      || s.source.toLowerCase().includes(q)
      || s.destination.toLowerCase().includes(q)
      || (s.driverId?.name ?? '').toLowerCase().includes(q)
      || (s.vehicleId?.registrationNumber ?? '').toLowerCase().includes(q);
    const matchFilter = filter === 'all' || s.status === filter;
    return matchSearch && matchFilter;
  }), [shipments, search, filter]);

  // revenue is only set once a trip Completes — treat missing as 0 for totals/display.
  const totalValue = shipments.reduce((acc, s) => acc + (s.revenue ?? 0), 0);

  const handleCreate = async (data) => {
    try {
      await createTrip(data);
      showToast('Shipment scheduled as Draft');
      setShowCreate(false);
    } catch (err) {
      showToast(err.response?.data?.message ?? 'Failed to schedule shipment', 'error');
    }
  };

  const runAction = async (id, action, label) => {
    setBusyId(id);
    try {
      await action(id);
      showToast(label);
    } catch (err) {
      showToast(err.response?.data?.message ?? 'Action failed', 'error');
    } finally {
      setBusyId(null);
      setCancelTarget(null);
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#131b2e] text-white text-sm font-medium rounded-xl shadow-2xl">
          {toast.type === 'error' ? <AlertCircle size={16} className="text-[#f87171]" /> : <CheckCircle2 size={16} className="text-[#4ade80]" />}
          {toast.message}
        </div>
      )}

      {showCreate && <CreateTripModal onClose={() => setShowCreate(false)} onSave={handleCreate} />}
      <ConfirmDialog
        open={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={() => runAction(cancelTarget._id, cancelTrip, 'Shipment cancelled')}
        title="Cancel this shipment?"
        message={`${cancelTarget?.source ?? ''} → ${cancelTarget?.destination ?? ''} will be marked Cancelled.`}
        intent="danger"
        confirmLabel="Cancel Shipment"
        cancelLabel="Back"
        loading={busyId === cancelTarget?._id}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Shipment Tracking</h1>
          <p className="text-sm text-[#737686] mt-0.5">{shipments.length} shipments · ₹{(totalValue / 100000).toFixed(1)}L total value</p>
        </div>
        {canManage && (
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm"
          >
            <Plus size={16} />New Shipment
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">
          <AlertCircle size={16} />{error}
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Dispatched', count: shipments.filter(s => s.status === SHIPMENT_STATUS.DISPATCHED).length, color: 'text-[#2563eb] bg-[#eff6ff]' },
          { label: 'Draft',      count: shipments.filter(s => s.status === SHIPMENT_STATUS.DRAFT).length,      color: 'text-[#475569] bg-[#f1f5f9]' },
          { label: 'Completed',  count: shipments.filter(s => s.status === SHIPMENT_STATUS.COMPLETED).length,  color: 'text-[#16a34a] bg-[#dcfce7]' },
          { label: 'Total Value', count: `₹${(totalValue / 100000).toFixed(1)}L`,                              color: 'text-[#7c3aed] bg-[#f5f3ff]' },
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
          <input type="search" placeholder="Search route, driver, vehicle…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#cbd5e1] bg-white placeholder-[#737686] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-colors" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...SHIPMENT_STATUS_OPTIONS].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={['h-9 px-3 text-xs font-medium rounded-lg border capitalize transition-colors',
              filter === f ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb]' : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8]'].join(' ')}>
              {f === 'all' ? 'All' : f}
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
                {['Route', 'Driver / Vehicle', 'Weight', 'Value', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={7} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
                    <Loader2 size={28} className="animate-spin text-[#2563eb]" />
                    <p className="text-sm font-medium text-[#475569]">Loading shipments…</p>
                  </div>
                </td></tr>
              ) : filtered.length === 0
                ? <tr><td colSpan={7} className="px-4 py-12 text-center text-sm text-[#737686]">No shipments found</td></tr>
                : filtered.map((s, i) => {
                    const badge = SHIPMENT_STATUS_BADGE[s.status] ?? { status: 'neutral', label: s.status };
                    return (
                      <tr key={s._id} className={`border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors ${i % 2 === 1 ? 'bg-[#fafafa]' : ''}`}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="text-[#475569]">{s.source}</span>
                          <span className="mx-1.5 text-[#c3c6d7]">→</span>
                          <span className="text-[#475569]">{s.destination}</span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-[#131b2e]">{s.driverId?.name ?? '—'}</p>
                          <p className="text-xs text-[#737686] font-mono">{s.vehicleId?.registrationNumber ?? '—'}</p>
                        </td>
                        <td className="px-4 py-3 text-[#475569]">{s.cargoWeight?.toLocaleString()} kg</td>
                        <td className="px-4 py-3 font-semibold text-[#2563eb]">{s.revenue != null ? `₹${s.revenue.toLocaleString()}` : '—'}</td>
                        <td className="px-4 py-3 text-xs text-[#737686]">{s.createdAt ? new Date(s.createdAt).toLocaleDateString() : '—'}</td>
                        <td className="px-4 py-3"><StatusBadge status={badge.status} label={badge.label} size="sm" /></td>
                        <td className="px-4 py-3">
                          {canManage ? (
                            <div className="flex items-center gap-1">
                              {s.status === SHIPMENT_STATUS.DRAFT && (
                                <button
                                  disabled={busyId === s._id}
                                  onClick={() => runAction(s._id, dispatchTrip, 'Shipment dispatched')}
                                  title="Dispatch"
                                  className="p-1.5 text-[#737686] hover:text-[#2563eb] hover:bg-[#eff6ff] rounded transition-colors disabled:opacity-50"
                                >
                                  <Send size={13} />
                                </button>
                              )}
                              {s.status === SHIPMENT_STATUS.DISPATCHED && (
                                <button
                                  disabled={busyId === s._id}
                                  onClick={() => runAction(s._id, (id) => completeTrip(id, {}), 'Shipment completed')}
                                  title="Complete"
                                  className="p-1.5 text-[#737686] hover:text-[#15803d] hover:bg-[#dcfce7] rounded transition-colors disabled:opacity-50"
                                >
                                  <CheckCircle2 size={13} />
                                </button>
                              )}
                              {(s.status === SHIPMENT_STATUS.DRAFT || s.status === SHIPMENT_STATUS.DISPATCHED) && (
                                <button
                                  disabled={busyId === s._id}
                                  onClick={() => setCancelTarget(s)}
                                  title="Cancel"
                                  className="p-1.5 text-[#737686] hover:text-[#dc2626] hover:bg-[#fee2e2] rounded transition-colors disabled:opacity-50"
                                >
                                  <XCircle size={13} />
                                </button>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs text-[#c3c6d7]">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#f1f5f9]">
          <p className="text-xs text-[#737686]">Showing {filtered.length} of {shipments.length} shipments</p>
        </div>
      </div>
    </div>
  );
};

export default ShipmentsPage;
