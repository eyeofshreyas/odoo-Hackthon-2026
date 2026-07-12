import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Truck, Users, Navigation, Wrench,
  Receipt, BarChart3, Route, Package, LogOut,
  ChevronRight,
} from 'lucide-react';
import { PATHS } from '../../routes/paths';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { to: PATHS.DASHBOARD,    icon: LayoutDashboard, label: 'Dashboard'       },
  { to: PATHS.VEHICLES,     icon: Truck,           label: 'Fleet'           },
  { to: PATHS.DRIVERS,      icon: Users,           label: 'Drivers'         },
  { to: PATHS.TRIPS,        icon: Navigation,      label: 'Trips'           },
  { to: PATHS.MAINTENANCE,  icon: Wrench,          label: 'Maintenance'     },
  { to: PATHS.FUEL_EXPENSE, icon: Receipt,         label: 'Fuel & Expenses' },
  { to: PATHS.ROUTES,       icon: Route,           label: 'Routes'          },
  { to: PATHS.SHIPMENTS,    icon: Package,         label: 'Shipments'       },
  { to: PATHS.REPORTS,      icon: BarChart3,       label: 'Reports'         },
];

const Sidebar = ({ mobileOpen, onMobileClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  const handleLogout = () => {
    logout();
    navigate(PATHS.LOGIN, { replace: true });
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={[
          'fixed left-0 top-0 z-50 h-screen w-[280px] flex flex-col',
          'transition-transform duration-300 ease-in-out',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ].join(' ')}
        style={{ backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0' }}
      >
        {/* ── Brand ── */}
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: '1px solid #f1f5f9' }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
          >
            <Truck size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold leading-tight" style={{ color: '#131b2e' }}>
              TransitOps
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#737686' }}>
              Logistics Platform
            </p>
          </div>
        </div>

        {/* ── Section Label ── */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: '#94a3b8' }}>
            Main Navigation
          </p>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto pb-4">
          <ul className="space-y-0.5 px-3">
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => [
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative',
                    isActive
                      ? 'font-semibold'
                      : 'hover:bg-[#f8fafc]',
                  ].join(' ')}
                  style={({ isActive }) => isActive ? {
                    backgroundColor: 'rgba(37,99,235,0.08)',
                    color: '#1d4ed8',
                    borderLeft: '3px solid #2563eb',
                    paddingLeft: '9px',
                  } : {
                    color: '#475569',
                    borderLeft: '3px solid transparent',
                    paddingLeft: '9px',
                  }}
                  onClick={onMobileClose}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        style={{ color: isActive ? '#2563eb' : '#94a3b8' }}
                        className="shrink-0 transition-colors"
                      />
                      <span className="truncate flex-1">{label}</span>
                      {isActive && (
                        <ChevronRight size={14} style={{ color: '#2563eb' }} className="shrink-0" />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── User card at bottom ── */}
        <div className="p-3" style={{ borderTop: '1px solid #f1f5f9' }}>
          <div
            className="flex items-center gap-3 p-3 rounded-xl"
            style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}
          >
            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
            >
              {initials}
            </div>
            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: '#131b2e' }}>{user?.name ?? 'User'}</p>
              <p className="text-[10px] truncate" style={{ color: '#737686' }}>
                {user?.role?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? 'Staff'}
              </p>
            </div>
            {/* Logout */}
            <button
              onClick={handleLogout}
              aria-label="Sign out"
              className="p-1.5 rounded-lg transition-colors hover:bg-red-50 hover:text-red-600"
              style={{ color: '#94a3b8' }}
              title="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
