import { useState } from 'react';
import { Bell, Menu, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

/**
 * Topbar
 * Fixed 64px top bar — search, notifications, user menu with logout.
 * Props:
 *   onMobileMenuOpen — opens sidebar on mobile
 */
const Topbar = ({ onMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  const roleLabel = user?.role
    ? user.role.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Unknown Role';

  const handleLogout = () => {
    logout();
    navigate(PATHS.LOGIN, { replace: true });
  };

  return (
    <header
      className={[
        'h-[64px] sticky top-0 z-40 w-full',
        'bg-white border-b border-[#c3c6d7]',
        'flex items-center justify-between px-6 gap-4',
      ].join(' ')}
    >
      {/* ── Left: Mobile hamburger + Page search ── */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 rounded-lg text-[#434655] hover:bg-[#eaedff] hover:text-[#004ac6] transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        {/* Global search */}
        <div className="relative w-full max-w-sm">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none"
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search fleet, drivers, trips…"
            className={[
              'w-full h-9 pl-9 pr-4 rounded-lg text-sm',
              'bg-[#f2f3ff] border border-[#c3c6d7]',
              'text-[#131b2e] placeholder-[#737686]',
              'focus:outline-none focus:ring-2 focus:ring-[#2563eb]/30 focus:border-[#2563eb]',
              'transition-all duration-150',
            ].join(' ')}
          />
        </div>
      </div>

      {/* ── Right: Notifications + User ── */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button
          className="relative p-2 rounded-lg text-[#434655] hover:bg-[#eaedff] hover:text-[#004ac6] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-7 bg-[#c3c6d7] mx-1" />

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-[#eaedff] transition-colors group"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center shrink-0">
              <span className="text-white text-xs font-bold">{initials}</span>
            </div>
            {/* Name + role */}
            <div className="hidden md:block text-left">
              <p className="text-[13px] font-semibold text-[#131b2e] leading-tight">{user?.name ?? 'User'}</p>
              <p className="text-[11px] text-[#434655] leading-tight">{roleLabel}</p>
            </div>
            <ChevronDown
              size={14}
              className={`text-[#737686] group-hover:text-[#004ac6] transition-all hidden md:block ${dropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} aria-hidden />
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-[#e2e8f0] shadow-lg z-20 overflow-hidden">
                {/* User info */}
                <div className="px-4 py-3 border-b border-[#f1f5f9]">
                  <p className="text-xs font-semibold text-[#131b2e] truncate">{user?.name}</p>
                  <p className="text-xs text-[#737686] truncate mt-0.5">{user?.email}</p>
                </div>
                {/* Menu items */}
                <div className="py-1">
                  <button
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#434655] hover:bg-[#f2f3ff] hover:text-[#004ac6] transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <User size={15} />Profile
                  </button>
                  <button
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#434655] hover:bg-[#f2f3ff] hover:text-[#004ac6] transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Settings size={15} />Settings
                  </button>
                </div>
                <div className="border-t border-[#f1f5f9] py-1">
                  <button
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#dc2626] hover:bg-[#fee2e2] transition-colors"
                    onClick={handleLogout}
                  >
                    <LogOut size={15} />Sign out
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
