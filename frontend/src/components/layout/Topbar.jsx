import { useState } from 'react';
import { Bell, Menu, ChevronDown, LogOut, User, Settings, HelpCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

const Topbar = ({ onMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropOpen, setDropOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : '??';

  const handleLogout = () => {
    logout();
    navigate(PATHS.LOGIN, { replace: true });
  };

  return (
    <header
      className="h-16 sticky top-0 z-40 flex items-center justify-between px-6 gap-4"
      style={{
        backgroundColor: '#FFFDF9',
        borderBottom: '1px solid #d4c4b7',
        boxShadow: '0 1px 4px rgba(61,49,38,0.06)',
      }}
    >
      {/* Left — hamburger + search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 rounded-lg transition-colors"
          style={{ color: '#50453b' }}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="#82756a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search vehicle, driver, trip..."
            className="w-full h-9 pl-10 pr-4 text-sm rounded-full border transition-all focus:outline-none"
            style={{
              backgroundColor: '#F3EDE4',
              borderColor: '#d4c4b7',
              color: '#3D3126',
            }}
            onFocus={e => { e.target.style.borderColor = '#A67C52'; e.target.style.boxShadow = '0 0 0 2px rgba(166,124,82,0.15)'; }}
            onBlur={e => { e.target.style.borderColor = '#d4c4b7'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
      </div>

      {/* Right — actions + user */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <button
          className="relative w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#F3EDE4]"
          style={{ color: '#50453b' }}
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span
            className="absolute top-2 right-2 w-2 h-2 rounded-full border-2"
            style={{ backgroundColor: '#ba1a1a', borderColor: '#FFFDF9' }}
          />
        </button>

        {/* Help */}
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-[#F3EDE4]"
          style={{ color: '#50453b' }}
          aria-label="Help"
        >
          <HelpCircle size={20} />
        </button>

        {/* Divider */}
        <div className="h-8 w-px mx-1" style={{ backgroundColor: '#d4c4b7' }} />

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropOpen(v => !v)}
            aria-haspopup="true"
            aria-expanded={dropOpen}
            className="flex items-center gap-2.5 pl-1 pr-2 py-1 rounded-full transition-colors hover:bg-[#F3EDE4]"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: 'linear-gradient(135deg, #A67C52, #7c5730)' }}
            >
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-[13px] font-semibold leading-tight" style={{ color: '#3D3126' }}>
                {user?.name ?? 'User'}
              </p>
              <p className="text-[11px] leading-tight" style={{ color: '#6f6148' }}>
                {user?.role?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) ?? 'Staff'}
              </p>
            </div>
            <ChevronDown
              size={14}
              style={{ color: '#82756a' }}
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
                  backgroundColor: '#FFFDF9',
                  border: '1px solid #d4c4b7',
                  boxShadow: '0 8px 24px rgba(61,49,38,0.12)',
                }}
              >
                <div className="px-4 py-3" style={{ borderBottom: '1px solid #f0ede9' }}>
                  <p className="text-xs font-bold truncate" style={{ color: '#3D3126' }}>{user?.name}</p>
                  <p className="text-xs truncate mt-0.5" style={{ color: '#6f6148' }}>{user?.email}</p>
                </div>
                <div className="py-1">
                  {[
                    { icon: User, label: 'Profile' },
                    { icon: Settings, label: 'Settings' },
                  ].map(({ icon: Icon, label }) => (
                    <button
                      key={label}
                      onClick={() => setDropOpen(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-[#F3EDE4]"
                      style={{ color: '#50453b' }}
                    >
                      <Icon size={15} />
                      {label}
                    </button>
                  ))}
                </div>
                <div className="py-1" style={{ borderTop: '1px solid #f0ede9' }}>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors hover:bg-red-50"
                    style={{ color: '#ba1a1a' }}
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
