/**
 * LoadingSpinner — Animated spinner indicator.
 *
 * @prop {'xs'|'sm'|'md'|'lg'|'xl'} size
 * @prop {'primary'|'white'|'gray'} color
 * @prop {string} label    — ARIA label for screen readers
 * @prop {boolean} fullPage — centers spinner in full viewport
 * @prop {string} className
 */

const sizeMap = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorMap = {
  primary: 'text-[#2563eb]',
  white: 'text-white',
  gray: 'text-[#94a3b8]',
};

const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  label = 'Loading…',
  fullPage = false,
  className = '',
}) => {
  const spinner = (
    <svg
      className={[
        'animate-spin shrink-0',
        sizeMap[size] ?? sizeMap.md,
        colorMap[color] ?? colorMap.primary,
        className,
      ].join(' ')}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      role="img"
      aria-label={label}
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px] z-50">
        {spinner}
        <span className="sr-only">{label}</span>
      </div>
    );
  }

  return (
    <span className="inline-flex items-center justify-center">
      {spinner}
      <span className="sr-only">{label}</span>
    </span>
  );
};

export default LoadingSpinner;
