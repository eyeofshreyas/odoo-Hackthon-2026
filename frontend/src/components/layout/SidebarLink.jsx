import { NavLink } from 'react-router-dom';

/**
 * SidebarLink
 * Single navigation item in the sidebar.
 * Applies Stitch active state: primary/10 bg + 4px left border.
 *
 * Props:
 *   to       — route path
 *   icon     — Lucide React icon component
 *   label    — display text
 *   end      — (optional) exact match for NavLink
 */
const SidebarLink = ({ to, icon: Icon, label, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-150 group select-none',
          isActive
            ? 'bg-blue-600/10 text-blue-700 font-semibold border-l-4 border-blue-600 rounded-l-none pl-3'
            : 'text-slate-500 hover:bg-blue-600/5 hover:text-blue-700 border-l-4 border-transparent pl-3',
        ].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={20}
            className={`flex-shrink-0 transition-transform duration-150 group-hover:scale-110 ${
              isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'
            }`}
          />
          <span className="truncate">{label}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarLink;
