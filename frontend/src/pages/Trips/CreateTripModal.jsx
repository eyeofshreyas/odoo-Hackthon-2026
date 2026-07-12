/**
 * CreateTripModal — creates a Draft trip. Vehicle/driver options are
 * loaded live and narrowed to ones that could actually be dispatched
 * (Available) so the create step can't pick a busy resource.
 */
import { useState } from 'react';
import { Navigation, X, CheckCircle } from 'lucide-react';
import useVehicles from '../../hooks/useVehicles';
import useDrivers from '../../hooks/useDrivers';

const EMPTY_FORM = {
  source: '',
  destination: '',
  vehicleId: '',
  driverId: '',
  cargoWeight: '',
  plannedDistance: '',
};

const CreateTripModal = ({ onClose, onSave }) => {
  const { vehicles } = useVehicles();
  const { drivers } = useDrivers();
  const [form, setForm] = useState(EMPTY_FORM);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const availableVehicles = vehicles.filter((v) => v.status === 'Available');
  const availableDrivers = drivers.filter((d) => d.status === 'Available');

  const isValid = form.source.trim() && form.destination.trim() && form.vehicleId
    && form.driverId && form.cargoWeight !== '' && form.plannedDistance !== '';

  const handleSave = () => {
    if (!isValid) return;
    onSave({
      source: form.source.trim(),
      destination: form.destination.trim(),
      vehicleId: form.vehicleId,
      driverId: form.driverId,
      cargoWeight: Number(form.cargoWeight),
      plannedDistance: Number(form.plannedDistance),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(19,27,46,0.5)' }}>
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" style={{ border: '1px solid #e2e8f0' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f1f5f9' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#eff6ff] flex items-center justify-center">
              <Navigation size={18} className="text-[#2563eb]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#131b2e]">Schedule Trip</h3>
              <p className="text-xs text-[#737686]">Creates a Draft trip — dispatch it separately</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#f8fafc] transition-colors" style={{ color: '#94a3b8' }}>
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Source *</label>
              <input
                value={form.source}
                onChange={(e) => set('source', e.target.value)}
                placeholder="Mumbai"
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Destination *</label>
              <input
                value={form.destination}
                onChange={(e) => set('destination', e.target.value)}
                placeholder="Delhi"
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Vehicle *</label>
              <select
                value={form.vehicleId}
                onChange={(e) => set('vehicleId', e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              >
                <option value="" disabled>Select vehicle</option>
                {availableVehicles.map((v) => (
                  <option key={v._id} value={v._id}>{v.registrationNumber} — {v.vehicleName}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Driver *</label>
              <select
                value={form.driverId}
                onChange={(e) => set('driverId', e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] bg-white focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              >
                <option value="" disabled>Select driver</option>
                {availableDrivers.map((d) => (
                  <option key={d._id} value={d._id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Cargo Weight (kg) *</label>
              <input
                type="number"
                min={0}
                value={form.cargoWeight}
                onChange={(e) => set('cargoWeight', e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">Planned Distance (km) *</label>
              <input
                type="number"
                min={0}
                value={form.plannedDistance}
                onChange={(e) => set('plannedDistance', e.target.value)}
                className="w-full h-10 px-3 text-sm rounded-lg border border-[#e2e8f0] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4" style={{ borderTop: '1px solid #f1f5f9' }}>
          <button onClick={onClose} className="h-9 px-5 text-sm font-medium rounded-lg border border-[#e2e8f0] text-[#475569] hover:bg-[#f8fafc] transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className="h-9 px-5 text-sm font-semibold rounded-lg bg-[#2563eb] text-white hover:bg-[#1d4ed8] transition-colors flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle size={15} />Schedule Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTripModal;
