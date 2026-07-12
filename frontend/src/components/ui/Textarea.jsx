import { forwardRef } from 'react';

/**
 * TextArea — Multi-line text input.
 *
 * @prop {string} label
 * @prop {string} error
 * @prop {string} hint
 * @prop {number} rows
 * @prop {boolean} resize  — allow vertical resize
 * @prop {boolean} disabled
 * @prop {string} className
 */
const TextArea = forwardRef(({
  label,
  error,
  hint,
  rows = 4,
  resize = true,
  disabled = false,
  id,
  className = '',
  ...props
}, ref) => {
  const areaId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={areaId} className="text-xs font-semibold text-[#434655] tracking-wide uppercase">
          {label}
        </label>
      )}

      <textarea
        ref={ref}
        id={areaId}
        rows={rows}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${areaId}-error` : hint ? `${areaId}-hint` : undefined}
        className={[
          'w-full px-3 py-2 text-sm rounded-lg border bg-white text-[#131b2e] placeholder-[#737686]',
          'transition-colors duration-150',
          'focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20',
          error
            ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20'
            : 'border-[#cbd5e1] hover:border-[#94a3b8]',
          disabled ? 'opacity-50 cursor-not-allowed bg-[#f8fafc]' : '',
          resize ? 'resize-y' : 'resize-none',
        ].join(' ')}
        {...props}
      />

      {error && (
        <p id={`${areaId}-error`} role="alert" className="text-xs text-[#dc2626] flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 6a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 7zm0-2.5a.875.875 0 110 1.75A.875.875 0 018 4.5z" />
          </svg>
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${areaId}-hint`} className="text-xs text-[#737686]">{hint}</p>
      )}
    </div>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;
