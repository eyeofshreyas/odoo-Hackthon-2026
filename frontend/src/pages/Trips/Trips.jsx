import { useState, useMemo } from 'react';
import { Plus, Search, MapPin, AlertCircle, Loader2, Send, CheckCircle2, XCircle } from 'lucide-react';
import StatusBadge from '../../components/ui/StatusBadge';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import useTrips from '../../hooks/useTrips';
import { useAuth } from '../../context/AuthContext';
import { ROLES } from '../../constants/roles';
import { TRIP_STATUS, TRIP_STATUS_OPTIONS, TRIP_STATUS_BADGE } from '../../constants/tripStatus';
import CreateTripModal from './CreateTripModal';

const STAT_COLORS = {
  neutral: 'bg-[#f1f5f9] text-[#475569]',
  info: 'bg-[#dbeafe] text-[#1d4ed8]',
  success: 'bg-[#dcfce7] text-[#15803d]',
  danger: 'bg-[#fee2e2] text-[#b91c1c]',
};

const TripsPage = () => {
  const { trips, isLoading, error, createTrip, dispatchTrip, completeTrip, cancelTrip } = useTrips();
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

  const filtered = useMemo(() => trips.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch = !q
      || t.source.toLowerCase().includes(q)
      || t.destination.toLowerCase().includes(q)
      || (t.driverId?.name ?? '').toLowerCase().includes(q)
      || (t.vehicleId?.registrationNumber ?? '').toLowerCase().includes(q);
    const matchFilter = filter === 'all' || t.status === filter;
    return matchSearch && matchFilter;
  }), [trips, search, filter]);

  const stats = TRIP_STATUS_OPTIONS.map((s) => ({
    label: TRIP_STATUS_BADGE[s].label,
    count: trips.filter((t) => t.status === s).length,
    status: s,
  }));

  const handleCreate = async (data) => {
    try {
      await createTrip(data);
      showToast('Trip scheduled as Draft');
      setShowCreate(false);
    } catch (err) {
      showToast(err.response?.data?.message ?? 'Failed to schedule trip', 'error');
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
        onConfirm={() => runAction(cancelTarget._id, cancelTrip, 'Trip cancelled')}
        title="Cancel this trip?"
        message={`${cancelTarget?.source ?? ''} → ${cancelTarget?.destination ?? ''} will be marked Cancelled.`}
        intent="danger"
        confirmLabel="Cancel Trip"
        cancelLabel="Back"
        loading={busyId === cancelTarget?._id}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#131b2e] tracking-tight">Trip Management</h1>
          <p className="text-sm text-[#737686] mt-0.5">{trips.length} total trips</p>
        </div>
        {canManage && (
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 h-9 px-4 bg-[#2563eb] text-white text-sm font-semibold rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm"
          >
            <Plus size={16} />Schedule Trip
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-[#fecaca] bg-[#fef2f2] px-4 py-3 text-sm text-[#b91c1c]">
          <AlertCircle size={16} />{error}
        </div>
      )}

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-[#131b2e]">{s.count}</p>
              <p className="text-xs text-[#737686] mt-0.5">{s.label}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STAT_COLORS[TRIP_STATUS_BADGE[s.status].status]}`}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-[#e2e8f0] p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686]" />
          <input
            type="search"
            placeholder="Search by route, driver, vehicle…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-sm rounded-lg border border-[#cbd5e1] bg-white placeholder-[#737686] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', ...TRIP_STATUS_OPTIONS].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={['h-9 px-3 text-xs font-medium rounded-lg border capitalize transition-colors',
                filter === f ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb]' : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8]'].join(' ')}
            >
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
                {['Route', 'Driver / Vehicle', 'Cargo Weight', 'Distance', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={6} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2 text-[#94a3b8]">
                    <Loader2 size={28} className="animate-spin text-[#2563eb]" />
                    <p className="text-sm font-medium text-[#475569]">Loading trips…</p>
                  </div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-sm text-[#737686]">No trips found</td></tr>
              ) : filtered.map((t, i) => {
                const badge = TRIP_STATUS_BADGE[t.status] ?? { status: 'neutral', label: t.status };
                return (
                  <tr key={t._id} className={`border-b border-[#f1f5f9] last:border-0 hover:bg-[#f8fafc] transition-colors ${i % 2 === 1 ? 'bg-[#fafafa]' : ''}`}>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={12} className="text-[#2563eb] shrink-0" />
                        <span className="font-medium text-[#131b2e]">{t.source}</span>
                        <span className="text-[#c3c6d7]">→</span>
                        <span className="font-medium text-[#131b2e]">{t.destination}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#131b2e]">{t.driverId?.name ?? '—'}</p>
                      <p className="text-xs text-[#737686] font-mono">{t.vehicleId?.registrationNumber ?? '—'}</p>
                    </td>
                    <td className="px-4 py-3 text-[#475569]">{t.cargoWeight?.toLocaleString()} kg</td>
                    <td className="px-4 py-3 text-[#475569]">{(t.actualDistance ?? t.plannedDistance)} km</td>
                    <td className="px-4 py-3"><StatusBadge status={badge.status} label={badge.label} size="sm" /></td>
                    <td className="px-4 py-3">
                      {canManage ? (
                        <div className="flex items-center gap-1">
                          {t.status === TRIP_STATUS.DRAFT && (
                            <button
                              disabled={busyId === t._id}
                              onClick={() => runAction(t._id, dispatchTrip, 'Trip dispatched')}
                              title="Dispatch"
                              className="p-1.5 text-[#737686] hover:text-[#2563eb] hover:bg-[#eff6ff] rounded transition-colors disabled:opacity-50"
                            >
                              <Send size={14} />
                            </button>
                          )}
                          {t.status === TRIP_STATUS.DISPATCHED && (
                            <button
                              disabled={busyId === t._id}
                              onClick={() => runAction(t._id, (id) => completeTrip(id, {}), 'Trip completed')}
                              title="Complete"
                              className="p-1.5 text-[#737686] hover:text-[#15803d] hover:bg-[#dcfce7] rounded transition-colors disabled:opacity-50"
                            >
                              <CheckCircle2 size={14} />
                            </button>
                          )}
                          {(t.status === TRIP_STATUS.DRAFT || t.status === TRIP_STATUS.DISPATCHED) && (
                            <button
                              disabled={busyId === t._id}
                              onClick={() => setCancelTarget(t)}
                              title="Cancel"
                              className="p-1.5 text-[#737686] hover:text-[#dc2626] hover:bg-[#fee2e2] rounded transition-colors disabled:opacity-50"
                            >
                              <XCircle size={14} />
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-[#c3c6d7]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 bg-[#f8fafc] border-t border-[#f1f5f9]">
          <p className="text-xs text-[#737686]">Showing {filtered.length} of {trips.length} trips</p>
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
