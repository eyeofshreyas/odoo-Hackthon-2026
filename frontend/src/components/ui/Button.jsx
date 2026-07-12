import { forwardRef } from 'react';

/**
 * Button — Primary interactive element.
 *
 * @prop {'primary'|'secondary'|'ghost'|'danger'|'success'} variant
 * @prop {'sm'|'md'|'lg'} size
 * @prop {boolean} loading   — shows spinner, disables click
 * @prop {boolean} disabled
 * @prop {boolean} fullWidth
 * @prop {React.ReactNode} leftIcon
 * @prop {React.ReactNode} rightIcon
 * @prop {string} className
 */
const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...props
}, ref) => {

  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg border transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 select-none cursor-pointer';

  const variants = {
    primary:
      'bg-[#2563eb] text-white border-transparent hover:bg-[#1d4fd8] active:bg-[#1e40af] focus-visible:ring-[#2563eb] disabled:bg-[#93b4f7] disabled:text-white',
    secondary:
      'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc] active:bg-[#f1f5f9] focus-visible:ring-[#2563eb] disabled:opacity-50',
    ghost:
      'bg-transparent text-[#2563eb] border-transparent hover:bg-[#eff6ff] active:bg-[#dbeafe] focus-visible:ring-[#2563eb] disabled:opacity-40',
    danger:
      'bg-[#dc2626] text-white border-transparent hover:bg-[#b91c1c] active:bg-[#991b1b] focus-visible:ring-[#dc2626] disabled:opacity-50',
    success:
      'bg-[#16a34a] text-white border-transparent hover:bg-[#15803d] active:bg-[#166534] focus-visible:ring-[#16a34a] disabled:opacity-50',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-9 px-4 text-sm',
    lg: 'h-11 px-6 text-base',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={[
        base,
        variants[variant] ?? variants.primary,
        sizes[size] ?? sizes.md,
        fullWidth ? 'w-full' : '',
        isDisabled ? 'pointer-events-none' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      ) : leftIcon ? (
        <span className="shrink-0 w-4 h-4 flex items-center justify-center">{leftIcon}</span>
      ) : null}

      {children && <span>{children}</span>}

      {!loading && rightIcon ? (
        <span className="shrink-0 w-4 h-4 flex items-center justify-center">{rightIcon}</span>
      ) : null}
    </button>
  );
});

Button.displayName = 'Button';
export default Button;
