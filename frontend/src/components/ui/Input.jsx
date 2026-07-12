import { forwardRef } from 'react';

/**
 * Input — Text input field.
 *
 * @prop {string} label
 * @prop {string} error
 * @prop {string} hint
 * @prop {React.ReactNode} leftAddon  — icon/element on the left
 * @prop {React.ReactNode} rightAddon — icon/element on the right
 * @prop {boolean} disabled
 * @prop {string} className
 */
const Input = forwardRef(({
  label,
  error,
  hint,
  leftAddon,
  rightAddon,
  disabled = false,
  id,
  className = '',
  ...props
}, ref) => {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-[#434655] tracking-wide uppercase">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftAddon && (
          <span className="absolute left-3 text-[#737686] h-4 w-4 flex items-center justify-center pointer-events-none">
            {leftAddon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          className={[
            'w-full h-9 px-3 text-sm rounded-lg border bg-white text-[#131b2e] placeholder-[#737686]',
            'transition-colors duration-150',
            'focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20',
            error
              ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20'
              : 'border-[#cbd5e1] hover:border-[#94a3b8]',
            disabled ? 'opacity-50 cursor-not-allowed bg-[#f8fafc]' : '',
            leftAddon ? 'pl-9' : '',
            rightAddon ? 'pr-9' : '',
          ].join(' ')}
          {...props}
        />
        {rightAddon && (
          <span className="absolute right-3 text-[#737686] h-4 w-4 flex items-center justify-center">
            {rightAddon}
          </span>
        )}
      </div>

      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-[#dc2626] flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 6a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3A.75.75 0 018 7zm0-2.5a.875.875 0 110 1.75A.875.875 0 018 4.5z" />
          </svg>
          {error}
        </p>
      )}

      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-xs text-[#737686]">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
