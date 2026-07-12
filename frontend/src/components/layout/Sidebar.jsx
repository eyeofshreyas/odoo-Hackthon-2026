import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Truck, Users, Navigation, Wrench,
  Receipt, BarChart3, Route, Package, Settings, LogOut, Truck as TruckIcon,
} from 'lucide-react';
import { PATHS } from '../../routes/paths';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
        style={{ backgroundColor: '#F3EDE4', borderRight: '1px solid #d4c4b7' }}
      >
        {/* ── Brand ── */}
        <div className="flex items-center gap-3 px-6 py-6" style={{ borderBottom: '1px solid #d4c4b7' }}>
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm"
            style={{ backgroundColor: '#A67C52' }}
          >
            <Truck size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-[15px] font-bold leading-tight" style={{ color: '#7c5730' }}>
              TransitOps Pro
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: '#6f6148' }}>
              Ops Manager
            </p>
          </div>
        </div>

        {/* ── Navigation ── */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-0.5 px-3">
            {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => [
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group relative',
                    isActive
                      ? 'font-semibold'
                      : 'hover:opacity-80',
                  ].join(' ')}
                  style={({ isActive }) => isActive ? {
                    backgroundColor: 'rgba(166,124,82,0.12)',
                    color: '#7c5730',
                    borderLeft: '3px solid #A67C52',
                    paddingLeft: '9px',
                  } : {
                    color: '#50453b',
                    borderLeft: '3px solid transparent',
                    paddingLeft: '9px',
                  }}
                  onClick={onMobileClose}
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={18}
                        style={{ color: isActive ? '#A67C52' : '#6f6148' }}
                        className="shrink-0 transition-transform group-hover:scale-110"
                      />
                      <span className="truncate">{label}</span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── User card at bottom ── */}
        <div className="p-4" style={{ borderTop: '1px solid #d4c4b7' }}>
          <div
            className="flex items-center gap-3 p-3 rounded-xl border"
            style={{ backgroundColor: '#FFFDF9', borderColor: 'rgba(212,196,183,0.4)', boxShadow: '0 2px 8px rgba(61,49,38,0.06)' }}
          >
            {/* Avatar */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: 'linear-gradient(135deg, #A67C52, #7c5730)' }}
            >
              {initials}
            </div>
            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: '#3D3126' }}>{user?.name ?? 'User'}</p>
              <p className="text-[10px] truncate" style={{ color: '#6f6148' }}>
                {user?.role?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? 'Staff'}
              </p>
            </div>
            {/* Logout */}
            <button
              onClick={handleLogout}
              aria-label="Sign out"
              className="p-1.5 rounded-lg transition-colors hover:bg-red-50"
              style={{ color: '#82756a' }}
              title="Sign out"
            >
              <LogOut size={15} />
            </button>
          </div>

          {/* Settings link */}
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg mt-1 text-sm font-medium transition-all"
            style={{ color: '#50453b' }}
          >
            <Settings size={17} style={{ color: '#82756a' }} />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
