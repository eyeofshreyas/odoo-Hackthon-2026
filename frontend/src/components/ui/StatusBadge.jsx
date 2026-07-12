/**
 * StatusBadge — Semantic status pill.
 *
 * @prop {'success'|'warning'|'danger'|'info'|'neutral'} status
 * @prop {string} label    — display text (falls back to status if omitted)
 * @prop {'sm'|'md'} size
 * @prop {boolean} dot     — show leading colored dot
 * @prop {string} className
 */

const statusConfig = {
  success: {
    bg: 'bg-[#dcfce7]',
    text: 'text-[#15803d]',
    dot: 'bg-[#16a34a]',
    defaultLabel: 'Active',
  },
  warning: {
    bg: 'bg-[#fef3c7]',
    text: 'text-[#b45309]',
    dot: 'bg-[#d97706]',
    defaultLabel: 'Pending',
  },
  danger: {
    bg: 'bg-[#fee2e2]',
    text: 'text-[#b91c1c]',
    dot: 'bg-[#dc2626]',
    defaultLabel: 'Critical',
  },
  info: {
    bg: 'bg-[#dbeafe]',
    text: 'text-[#1d4ed8]',
    dot: 'bg-[#2563eb]',
    defaultLabel: 'Info',
  },
  neutral: {
    bg: 'bg-[#f1f5f9]',
    text: 'text-[#475569]',
    dot: 'bg-[#94a3b8]',
    defaultLabel: 'Inactive',
  },
};

const StatusBadge = ({
  status = 'neutral',
  label,
  size = 'md',
  dot = true,
  className = '',
}) => {
  const config = statusConfig[status] ?? statusConfig.neutral;
  const displayLabel = label ?? config.defaultLabel;

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  return (
    <span
      role="status"
      aria-label={`Status: ${displayLabel}`}
      className={[
        'inline-flex items-center gap-1.5 font-semibold rounded-full leading-none',
        config.bg,
        config.text,
        sizes[size] ?? sizes.md,
        className,
      ].join(' ')}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} aria-hidden="true" />
      )}
      {displayLabel}
    </span>
  );
};

export default StatusBadge;
