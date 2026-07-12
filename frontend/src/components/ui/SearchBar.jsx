import { forwardRef } from 'react';

/**
 * SearchBar — Controlled search input with clear button.
 *
 * @prop {string} value
 * @prop {(v: string) => void} onChange
 * @prop {string} placeholder
 * @prop {boolean} loading   — shows spinner during async search
 * @prop {() => void} onClear
 * @prop {string} className
 */
const SearchBar = forwardRef(({
  value = '',
  onChange,
  placeholder = 'Search…',
  loading = false,
  onClear,
  className = '',
  ...props
}, ref) => {
  const handleClear = () => {
    onChange?.('');
    onClear?.();
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {/* Search icon */}
      <span className="absolute left-3 text-[#737686] pointer-events-none h-4 w-4 flex items-center justify-center">
        {loading ? (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3 3" strokeLinecap="round" />
          </svg>
        )}
      </span>

      <input
        ref={ref}
        type="search"
        role="searchbox"
        aria-label={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={[
          'w-full h-9 pl-9 pr-8 text-sm rounded-lg border border-[#cbd5e1] bg-white text-[#131b2e] placeholder-[#737686]',
          'transition-colors duration-150',
          'focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/20',
          'hover:border-[#94a3b8]',
          // Hide default browser clear button
          '[&::-webkit-search-cancel-button]:hidden',
        ].join(' ')}
        {...props}
      />

      {/* Clear button */}
      {value && !loading && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-2.5 text-[#737686] hover:text-[#131b2e] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2563eb] rounded"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';
export default SearchBar;
