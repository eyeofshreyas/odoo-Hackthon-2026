/**
 * Pagination — Page navigation control.
 *
 * @prop {number} page         — current page (1-indexed)
 * @prop {number} totalPages
 * @prop {(p: number) => void} onPageChange
 * @prop {number} siblingsCount — pages shown on each side of current
 * @prop {string} className
 */

const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) result.push(i);
  return result;
};

const ELLIPSIS = '…';

const buildPages = (page, total, siblings = 1) => {
  const totalShown = siblings * 2 + 5; // siblings + current + 2 ends + 2 ellipses

  if (total <= totalShown) return range(1, total);

  const leftSib = Math.max(page - siblings, 1);
  const rightSib = Math.min(page + siblings, total);

  const showLeft = leftSib > 2;
  const showRight = rightSib < total - 1;

  if (!showLeft && showRight) {
    return [...range(1, 3 + siblings * 2), ELLIPSIS, total];
  }
  if (showLeft && !showRight) {
    return [1, ELLIPSIS, ...range(total - 2 - siblings * 2, total)];
  }
  return [1, ELLIPSIS, ...range(leftSib, rightSib), ELLIPSIS, total];
};

const PageButton = ({ page, current, onClick, disabled, children }) => {
  const isCurrent = page === current;
  return (
    <button
      type="button"
      onClick={() => !disabled && !isCurrent && onClick(page)}
      aria-label={typeof page === 'number' ? `Page ${page}` : undefined}
      aria-current={isCurrent ? 'page' : undefined}
      disabled={disabled}
      className={[
        'h-8 min-w-[2rem] px-2 flex items-center justify-center text-sm rounded-md border transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]',
        isCurrent
          ? 'bg-[#2563eb] text-white border-[#2563eb] font-semibold pointer-events-none'
          : 'bg-white text-[#475569] border-[#e2e8f0] hover:bg-[#f8fafc] hover:border-[#94a3b8]',
        disabled ? 'opacity-40 cursor-not-allowed' : '',
      ].join(' ')}
    >
      {children ?? page}
    </button>
  );
};

const Pagination = ({
  page = 1,
  totalPages = 1,
  onPageChange,
  siblingsCount = 1,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const pages = buildPages(page, totalPages, siblingsCount);

  return (
    <nav aria-label="Pagination" className={`flex items-center gap-1 ${className}`}>
      {/* Previous */}
      <PageButton page={page - 1} current={-1} onClick={onPageChange} disabled={page <= 1}>
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PageButton>

      {/* Page numbers */}
      {pages.map((p, i) =>
        p === ELLIPSIS ? (
          <span key={`ellipsis-${i}`} className="h-8 min-w-[2rem] flex items-center justify-center text-sm text-[#737686] select-none">
            {ELLIPSIS}
          </span>
        ) : (
          <PageButton key={p} page={p} current={page} onClick={onPageChange} />
        )
      )}

      {/* Next */}
      <PageButton page={page + 1} current={-1} onClick={onPageChange} disabled={page >= totalPages}>
        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </PageButton>
    </nav>
  );
};

export default Pagination;
