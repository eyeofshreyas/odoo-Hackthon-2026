import { useState } from 'react';
import { Bell, Menu, ChevronDown, LogOut, User, Settings, HelpCircle, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

const PAGE_TITLES = {
  [PATHS.DASHBOARD]:    { title: 'Operations Dashboard',  sub: 'Real-time fleet & logistics overview' },
  [PATHS.VEHICLES]:     { title: 'Vehicle Registry',       sub: 'Fleet management & tracking' },
  [PATHS.DRIVERS]:      { title: 'Driver Management',      sub: 'Driver profiles & assignments' },
  [PATHS.TRIPS]:        { title: 'Trip Management',        sub: 'Active & scheduled trips' },
  [PATHS.MAINTENANCE]:  { title: 'Maintenance Tracker',    sub: 'Fleet service & repair records' },
  [PATHS.FUEL_EXPENSE]: { title: 'Fuel & Expenses',        sub: 'Fuel logs & cost tracking' },
  [PATHS.ROUTES]:       { title: 'Route Management',       sub: 'Route planning & optimization' },
  [PATHS.SHIPMENTS]:    { title: 'Shipment Tracking',      sub: 'Cargo shipments & delivery status' },
  [PATHS.REPORTS]:      { title: 'Fleet Reports',          sub: 'Analytics & performance metrics' },
};

const Topbar = ({ onMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropOpen, setDropOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  const pageInfo = PAGE_TITLES[location.pathname] ?? { title: 'TransitOps', sub: '' };

  const handleLogout = () => {
    logout();
    navigate(PATHS.LOGIN, { replace: true });
  };

  return (
    <header
      className="h-16 sticky top-0 z-40 flex items-center justify-between px-6 gap-4"
      style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(19,27,46,0.04)',
      }}
    >
      {/* Left — hamburger + page title */}
      <div className="flex items-center gap-4 min-w-0">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 rounded-lg transition-colors hover:bg-[#f8fafc]"
          style={{ color: '#475569' }}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Page title — desktop */}
        <div className="hidden lg:block min-w-0">
          <h2 className="text-sm font-bold leading-tight truncate" style={{ color: '#131b2e' }}>
            {pageInfo.title}
          </h2>
          {pageInfo.sub && (
            <p className="text-xs leading-tight" style={{ color: '#737686' }}>{pageInfo.sub}</p>
          )}
        </div>
      </div>

      {/* Center — search bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: '#94a3b8' }}
          />
          <input
            type="text"
            placeholder="Search vehicles, drivers, trips…"
            className="w-full h-9 pl-9 pr-4 text-sm rounded-full border transition-all focus:outline-none"
            style={{
              backgroundColor: '#f8fafc',
              borderColor: '#e2e8f0',
              color: '#131b2e',
            }}
            onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 2px rgba(37,99,235,0.12)'; e.target.style.backgroundColor = '#fff'; }}
            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; e.target.style.backgroundColor = '#f8fafc'; }}
          />
        </div>
      </div>

      {/* Right — actions + user */}
      <div className="flex items-center gap-1.5">
        {/* Notifications */}
        <button
          className="relative w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[#f8fafc]"
          style={{ color: '#475569' }}
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
            style={{ backgroundColor: '#dc2626', borderColor: '#ffffff' }}
          />
        </button>

        {/* Help */}
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[#f8fafc]"
          style={{ color: '#475569' }}
          aria-label="Help"
        >
          <HelpCircle size={18} />
        </button>

        {/* Divider */}
        <div className="h-7 w-px mx-1" style={{ backgroundColor: '#e2e8f0' }} />

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropOpen(v => !v)}
            aria-haspopup="true"
            aria-expanded={dropOpen}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg transition-colors hover:bg-[#f8fafc]"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}
            >
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-[13px] font-semibold leading-tight" style={{ color: '#131b2e' }}>
                {user?.name ?? 'User'}
              </p>
              <p className="text-[11px] leading-tight" style={{ color: '#737686' }}>
                {user?.role?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? 'Staff'}
              </p>
            </div>
            <ChevronDown
              size={14}
              style={{ color: '#94a3b8' }}
              className={`hidden md:block transition-transform ${dropOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown */}
          {dropOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropOpen(false)} aria-hidden />
              <div
                className="absolute right-0 top-full mt-2 w-52 rounded-xl overflow-hidden z-20"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 8px 24px rgba(19,27,46,0.12)',
                }}
              >
                <div className="px-4 py-3" style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <p className="text-xs font-bold truncate" style={{ color: '#131b2e' }}>{user?.name}</p>
                  <p className="text-xs truncate mt-0.5" style={{ color: '#737686' }}>{user?.email}</p>
                </div>
                <div className="py-1">
                  {[
                    { icon: User, label: 'Profile' },
                    { icon: Settings, label: 'Settings' },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      onClick={() => setDropOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[#f8fafc]"
                      style={{ color: '#475569' }}
                    >
                      <Icon size={15} style={{ color: '#94a3b8' }} />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="py-1" style={{ borderTop: '1px solid #f1f5f9' }}>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-red-50"
                    style={{ color: '#dc2626' }}
                  >
                    <LogOut size={15} />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
