/**
 * Card — Content container.
 *
 * @prop {string} title
 * @prop {string} description
 * @prop {React.ReactNode} headerAction — right-side element in header
 * @prop {React.ReactNode} footer
 * @prop {boolean} hoverable — adds hover shadow/border effect
 * @prop {boolean} noPadding — removes body padding
 * @prop {string} className
 */
const Card = ({
  children,
  title,
  description,
  headerAction,
  footer,
  hoverable = false,
  noPadding = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={[
        'bg-white rounded-lg border border-[#e2e8f0] overflow-hidden',
        hoverable ? 'transition-shadow duration-150 hover:shadow-md hover:border-[#94a3b8] cursor-pointer' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {/* Card Header */}
      {(title || description || headerAction) && (
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-[#f1f5f9]">
          <div className="flex-1 min-w-0">
            {title && <h3 className="text-sm font-semibold text-[#131b2e] truncate">{title}</h3>}
            {description && <p className="text-xs text-[#737686] mt-0.5">{description}</p>}
          </div>
          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </div>
      )}

      {/* Card Body */}
      <div className={noPadding ? '' : 'px-5 py-4'}>
        {children}
      </div>

      {/* Card Footer */}
      {footer && (
        <div className="px-5 py-3 bg-[#f8fafc] border-t border-[#f1f5f9]">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
