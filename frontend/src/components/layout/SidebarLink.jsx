import { NavLink } from 'react-router-dom';

/**
 * SidebarLink
 * Single navigation item matching Stitch "Logistics Core" design:
 * - Active: bg-[#2563eb]/10, text-[#004ac6], 4px left solid border, rounded-r-lg
 * - Inactive: text-[#434655], hover bg-[#eaedff], hover text-[#004ac6]
 *
 * Props:
 *   to    — route path
 *   icon  — Lucide React icon component
 *   label — display text
 *   end   — exact match flag for NavLink (default false)
 */
const SidebarLink = ({ to, icon: Icon, label, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 py-2.5 text-sm font-medium transition-all duration-150 group select-none rounded-r-lg',
          isActive
            ? 'bg-[#2563eb]/10 text-[#004ac6] font-semibold border-l-4 border-[#2563eb] pl-3 pr-4'
            : 'text-[#434655] hover:bg-[#eaedff] hover:text-[#004ac6] border-l-4 border-transparent pl-3 pr-4',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={19}
            className={[
              'flex-shrink-0 transition-transform duration-150',
              isActive
                ? 'text-[#2563eb]'
                : 'text-[#737686] group-hover:text-[#004ac6] group-hover:scale-110',
            ].join(' ')}
          />
          <span className="truncate leading-none">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarLink;
