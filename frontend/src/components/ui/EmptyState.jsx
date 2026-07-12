/**
 * EmptyState — Friendly placeholder when there's no data.
 *
 * @prop {React.ReactNode} icon
 * @prop {string} title
 * @prop {string} description
 * @prop {React.ReactNode} action    — CTA button
 * @prop {'sm'|'md'|'lg'} size
 * @prop {string} className
 */

const defaultIcon = (
  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="8" y="8" width="24" height="24" rx="4" />
    <path d="M15 20h10M15 25h6" strokeLinecap="round" />
    <path d="M26 8v6M14 8v6" />
  </svg>
);

const sizeConfig = {
  sm: { icon: 'w-10 h-10', title: 'text-sm', desc: 'text-xs', py: 'py-8' },
  md: { icon: 'w-12 h-12', title: 'text-base', desc: 'text-sm', py: 'py-12' },
  lg: { icon: 'w-16 h-16', title: 'text-lg', desc: 'text-base', py: 'py-16' },
};

const EmptyState = ({
  icon,
  title = 'No data found',
  description = 'There is nothing here yet.',
  action,
  size = 'md',
  className = '',
}) => {
  const s = sizeConfig[size] ?? sizeConfig.md;

  return (
    <div
      role="status"
      aria-label={title}
      className={[
        'flex flex-col items-center justify-center text-center px-6',
        s.py,
        className,
      ].join(' ')}
    >
      {/* Icon */}
      <span className={`${s.icon} text-[#c3c6d7] mb-4 flex items-center justify-center`}>
        {icon ?? defaultIcon}
      </span>

      {/* Title */}
      <h3 className={`font-semibold text-[#434655] mb-1 ${s.title}`}>{title}</h3>

      {/* Description */}
      {description && (
        <p className={`text-[#737686] max-w-xs ${s.desc}`}>{description}</p>
      )}

      {/* Action */}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
};

export default EmptyState;
