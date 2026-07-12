/**
 * Table — Data table with sortable headers.
 *
 * @prop {{ key: string, label: string, sortable?: boolean, width?: string, align?: 'left'|'center'|'right' }[]} columns
 * @prop {object[]} data           — array of row objects
 * @prop {string} rowKey           — unique field name for key
 * @prop {string} sortKey          — currently sorted column key
 * @prop {'asc'|'desc'} sortDir
 * @prop {(key: string) => void} onSort
 * @prop {boolean} loading
 * @prop {React.ReactNode} empty   — empty state override
 * @prop {string} className
 */

const SortIcon = ({ active, dir }) => (
  <span className="inline-flex flex-col ml-1 opacity-40 group-hover:opacity-70" aria-hidden="true">
    <svg
      className={`w-2.5 h-2.5 -mb-0.5 transition-opacity ${active && dir === 'asc' ? 'opacity-100 text-[#2563eb]' : ''}`}
      viewBox="0 0 10 6" fill="currentColor"
    >
      <path d="M5 0L10 6H0L5 0z" />
    </svg>
    <svg
      className={`w-2.5 h-2.5 transition-opacity ${active && dir === 'desc' ? 'opacity-100 text-[#2563eb]' : ''}`}
      viewBox="0 0 10 6" fill="currentColor"
    >
      <path d="M5 6L0 0h10L5 6z" />
    </svg>
  </span>
);

const alignClass = { left: 'text-left', center: 'text-center', right: 'text-right' };

const Table = ({
  columns = [],
  data = [],
  rowKey = 'id',
  sortKey,
  sortDir = 'asc',
  onSort,
  loading = false,
  empty,
  className = '',
}) => {
  return (
    <div className={`overflow-x-auto rounded-lg border border-[#e2e8f0] bg-white ${className}`}>
      <table className="w-full text-sm border-collapse">
        {/* Header */}
        <thead>
          <tr className="border-b-2 border-[#e2e8f0]">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                className={[
                  'px-4 py-3 text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap',
                  alignClass[col.align ?? 'left'],
                  col.sortable ? 'group select-none cursor-pointer hover:text-[#131b2e]' : '',
                ].join(' ')}
                onClick={col.sortable && onSort ? () => onSort(col.key) : undefined}
                aria-sort={
                  col.sortable
                    ? sortKey === col.key
                      ? sortDir === 'asc' ? 'ascending' : 'descending'
                      : 'none'
                    : undefined
                }
              >
                <span className="inline-flex items-center">
                  {col.label}
                  {col.sortable && (
                    <SortIcon active={sortKey === col.key} dir={sortDir} />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className={i % 2 === 1 ? 'bg-[#f8fafc]' : 'bg-white'}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    <div className="h-3 bg-[#e2e8f0] rounded animate-pulse" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-12 text-center">
                {empty ?? (
                  <span className="text-sm text-[#737686]">No data available</span>
                )}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={row[rowKey] ?? i}
                className={[
                  'border-b border-[#f1f5f9] last:border-0 transition-colors duration-100',
                  i % 2 === 1 ? 'bg-[#f8fafc]' : 'bg-white',
                  'hover:bg-[#eff6ff]',
                ].join(' ')}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={[
                      'px-4 py-3 text-[#131b2e]',
                      alignClass[col.align ?? 'left'],
                    ].join(' ')}
                  >
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
