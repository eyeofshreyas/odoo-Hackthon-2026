import { useState, useRef, useEffect } from 'react';

/**
 * FilterDropdown — Multi-select or single-select filter menu.
 *
 * @prop {string} label                                   — trigger button label
 * @prop {{ value: string, label: string }[]} options
 * @prop {string|string[]} value                          — controlled value(s)
 * @prop {(v: string|string[]) => void} onChange
 * @prop {boolean} multi                                  — allow multiple selections
 * @prop {string} placeholder                             — shown when nothing selected
 * @prop {string} className
 */
const FilterDropdown = ({
  label,
  options = [],
  value,
  onChange,
  multi = false,
  placeholder = 'All',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* Close on Escape */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const selectedArr = multi
    ? (Array.isArray(value) ? value : value ? [value] : [])
    : (value ? [value] : []);

  const isSelected = (v) => selectedArr.includes(v);

  const handleSelect = (optValue) => {
    if (multi) {
      const next = isSelected(optValue)
        ? selectedArr.filter((v) => v !== optValue)
        : [...selectedArr, optValue];
      onChange?.(next);
    } else {
      onChange?.(optValue === value ? '' : optValue);
      setOpen(false);
    }
  };

  const activeCount = selectedArr.length;
  const displayLabel = activeCount > 0
    ? `${label ?? 'Filter'} (${activeCount})`
    : (label ?? 'Filter');

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          'inline-flex items-center gap-2 h-9 px-3 text-sm font-medium rounded-lg border transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]',
          activeCount > 0
            ? 'bg-[#eff6ff] border-[#2563eb] text-[#2563eb]'
            : 'bg-white border-[#e2e8f0] text-[#475569] hover:border-[#94a3b8] hover:text-[#131b2e]',
        ].join(' ')}
      >
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M2 4h12M4 8h8M6 12h4" strokeLinecap="round" />
        </svg>
        {displayLabel}
        <svg className={`w-3 h-3 ml-auto transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 10 6" fill="currentColor" aria-hidden="true">
          <path d="M0 0l5 6 5-6H0z" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <ul
          role="listbox"
          aria-multiselectable={multi}
          aria-label={label ?? 'Filter options'}
          className="absolute z-20 mt-1 min-w-[10rem] bg-white border border-[#e2e8f0] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] py-1 left-0 top-full"
        >
          {options.map((opt) => {
            const selected = isSelected(opt.value);
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={selected}
                onClick={() => handleSelect(opt.value)}
                className={[
                  'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors',
                  selected
                    ? 'bg-[#eff6ff] text-[#2563eb] font-medium'
                    : 'text-[#131b2e] hover:bg-[#f8fafc]',
                ].join(' ')}
              >
                {multi && (
                  <span className={[
                    'w-4 h-4 rounded border flex items-center justify-center shrink-0',
                    selected ? 'bg-[#2563eb] border-[#2563eb]' : 'border-[#cbd5e1]',
                  ].join(' ')}>
                    {selected && (
                      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M1 4l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                )}
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default FilterDropdown;
