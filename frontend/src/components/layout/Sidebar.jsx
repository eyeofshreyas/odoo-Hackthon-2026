import {
  LayoutDashboard,
  Truck,
  Users,
  MapPin,
  Wrench,
  Receipt,
  BarChart3,
  Route,
  Package,
  Settings,
  Navigation,
} from 'lucide-react';
import { PATHS } from '../../routes/paths';
import SidebarLink from './SidebarLink';

/**
 * Navigation items — mandatory modules first, additional below divider.
 * Maps to Stitch sidebar design (icons aligned to Material Symbols equivalents).
 */
const PRIMARY_NAV = [
  { to: PATHS.DASHBOARD,    icon: LayoutDashboard, label: 'Dashboard' },
  { to: PATHS.VEHICLES,     icon: Truck,           label: 'Vehicles' },
  { to: PATHS.DRIVERS,      icon: Users,           label: 'Drivers' },
  { to: PATHS.TRIPS,        icon: Navigation,      label: 'Trips' },
  { to: PATHS.MAINTENANCE,  icon: Wrench,          label: 'Maintenance' },
  { to: PATHS.FUEL_EXPENSE, icon: Receipt,         label: 'Fuel & Expenses' },
  { to: PATHS.REPORTS,      icon: BarChart3,       label: 'Reports' },
];

const ADDITIONAL_NAV = [
  { to: PATHS.ROUTES,    icon: Route,   label: 'Routes' },
  { to: PATHS.SHIPMENTS, icon: Package, label: 'Shipments' },
];

/**
 * Sidebar
 * Fixed 280px left sidebar matching Stitch design:
 * - Background: surface-container-low (#f2f3ff in Logistics Core)
 * - Logo section at top
 * - Primary nav links
 * - Divider + Additional feature links
 * - Settings at bottom
 *
 * Props:
 *   mobileOpen    — boolean, sidebar open on mobile
 *   onMobileClose — callback to close on mobile
 */
const Sidebar = ({ mobileOpen, onMobileClose }) => {
  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={[
          'fixed left-0 top-0 z-50 h-screen w-[280px] flex flex-col',
          'bg-[#f2f3ff] border-r border-[#c3c6d7]',
          'transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
      >
        {/* ── Brand / Logo ── */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-[#c3c6d7]">
          <div className="w-9 h-9 rounded-lg bg-[#2563eb] flex items-center justify-center flex-shrink-0">
            <MapPin size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold text-[#004ac6] leading-tight tracking-tight">
              TransitOps
            </h1>
            <p className="text-[11px] text-[#434655] font-medium tracking-wide">
              Smart Transport Platform
            </p>
          </div>
        </div>

        {/* ── Primary Navigation ── */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#737686]">
            Main Menu
          </p>
          {PRIMARY_NAV.map((item) => (
            <SidebarLink key={item.to} {...item} />
          ))}

          {/* ── Divider + Additional ── */}
          <div className="my-3 border-t border-[#c3c6d7]" />
          <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-[#737686]">
            Additional
          </p>
          {ADDITIONAL_NAV.map((item) => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>

        {/* ── Settings footer ── */}
        <div className="px-3 py-3 border-t border-[#c3c6d7]">
          <SidebarLink to="/settings" icon={Settings} label="Settings" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
