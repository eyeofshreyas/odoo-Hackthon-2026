import { Bell, Menu, Search, ChevronDown } from 'lucide-react';

/**
 * Topbar (Navbar)
 * Fixed 64px top bar matching Stitch design:
 * - Background: surface-container-lowest (#ffffff)
 * - Border-bottom: outline-variant (#c3c6d7)
 * - Left: hamburger (mobile) + search bar
 * - Right: notification bell + user avatar/profile placeholder
 *
 * Props:
 *   onMobileMenuOpen — callback to toggle sidebar on mobile
 */
const Topbar = ({ onMobileMenuOpen }) => {
  return (
    <header
      className={[
        'h-[64px] sticky top-0 z-40 w-full',
        'bg-white border-b border-[#c3c6d7]',
        'flex items-center justify-between px-6 gap-4',
      ].join(' ')}
    >
      {/* ── Left: Mobile hamburger + Search ── */}
      <div className="flex items-center gap-4 flex-1">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMobileMenuOpen}
          className="lg:hidden p-2 rounded-lg text-[#434655] hover:bg-[#eaedff] hover:text-[#004ac6] transition-colors"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        {/* Search bar */}
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none"
          />
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

      {/* ── Right: Actions + User ── */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button
          className="relative p-2 rounded-lg text-[#434655] hover:bg-[#eaedff] hover:text-[#004ac6] transition-colors"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={20} />
          {/* Unread dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full border-2 border-white" />
        </button>

        {/* Divider */}
        <div className="w-px h-7 bg-[#c3c6d7] mx-1" />

        {/* User profile placeholder */}
        <button className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-[#eaedff] transition-colors group">
          {/* Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#2563eb] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">TM</span>
          </div>
          {/* Name + role — hidden on small screens */}
          <div className="hidden md:block text-left">
            <p className="text-[13px] font-semibold text-[#131b2e] leading-tight">
              Transit Manager
            </p>
            <p className="text-[11px] text-[#434655] leading-tight">
              Fleet Manager
            </p>
          </div>
          <ChevronDown
            size={14}
            className="text-[#737686] group-hover:text-[#004ac6] transition-colors hidden md:block"
          />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
