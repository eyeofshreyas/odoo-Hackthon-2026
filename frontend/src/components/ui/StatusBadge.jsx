/**
 * StatusBadge — Semantic status pill matching Stitch design.
 */
const statusConfig = {
  success: { bg: '#dcfce7', text: '#166534', dot: '#22c55e', defaultLabel: 'Active'      },
  warning: { bg: '#fef3c7', text: '#92400e', dot: '#d97706', defaultLabel: 'Pending'     },
  danger:  { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444', defaultLabel: 'Critical'    },
  info:    { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6', defaultLabel: 'In Transit'  },
  neutral: { bg: '#f5f5f4', text: '#57534e', dot: '#a8a29e', defaultLabel: 'Inactive'    },
};

const StatusBadge = ({
  status = 'neutral',
  label,
  size = 'md',
  dot = true,
  className = '',
}) => {
  const c = statusConfig[status] ?? statusConfig.neutral;
  const text = label ?? c.defaultLabel;

  const pad = size === 'sm'
    ? { padding: '2px 8px', fontSize: '11px', lineHeight: '16px' }
    : { padding: '3px 10px', fontSize: '12px', lineHeight: '18px' };

  return (
    <span
      role="status"
      aria-label={`Status: ${text}`}
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full whitespace-nowrap ${className}`}
      style={{ backgroundColor: c.bg, color: c.text, ...pad }}
    >
      {dot && (
        <span
          className="rounded-full shrink-0"
          style={{ width: '6px', height: '6px', backgroundColor: c.dot }}
          aria-hidden
        />
      )}
      {text}
    </span>
  );
};

export default StatusBadge;
