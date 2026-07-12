import { forwardRef } from 'react';

/**
 * Select — Native dropdown select.
 *
 * @prop {string} label
 * @prop {string} error
 * @prop {string} hint
 * @prop {string} placeholder
 * @prop {{ value: string, label: string }[]} options
 * @prop {boolean} disabled
 * @prop {string} className
 */
const Select = forwardRef(({
  label,
  error,
  hint,
  placeholder = 'Select an option',
  options = [],
  disabled = false,
  id,
  className = '',
  ...props
}, ref) => {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-[#434655] tracking-wide uppercase">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
          className={[
            'w-full h-9 pl-3 pr-8 text-sm rounded-lg border bg-white text-[#131b2e] appearance-none cursor-pointer',
            'transition-colors duration-150',
            'focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20',
            error
              ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20'
              : 'border-[#cbd5e1] hover:border-[#94a3b8]',
            disabled ? 'opacity-50 cursor-not-allowed bg-[#f8fafc]' : '',
          ].join(' ')}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Chevron icon */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#737686]">
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {error && (
        <p id={`${selectId}-error`} role="alert" className="text-xs text-[#dc2626] flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 6a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 7zm0-2.5a.875.875 0 110 1.75A.875.875 0 018 4.5z" />
          </svg>
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${selectId}-hint`} className="text-xs text-[#737686]">{hint}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
