/**
 * KPICard — Dashboard metric card.
 *
 * @prop {string} title        — metric label
 * @prop {string|number} value — primary value
 * @prop {string} unit         — e.g. "km", "%", "$"
 * @prop {React.ReactNode} icon
 * @prop {'up'|'down'|'neutral'} trend
 * @prop {string} trendLabel   — e.g. "+12% from last month"
 * @prop {'primary'|'success'|'warning'|'danger'|'info'} color
 * @prop {boolean} loading
 * @prop {string} className
 */

const colorMap = {
  primary: {
    icon: 'bg-[#eff6ff] text-[#2563eb]',
    trend_up: 'text-[#16a34a]',
    trend_down: 'text-[#dc2626]',
  },
  success: {
    icon: 'bg-[#dcfce7] text-[#16a34a]',
    trend_up: 'text-[#16a34a]',
    trend_down: 'text-[#dc2626]',
  },
  warning: {
    icon: 'bg-[#fef3c7] text-[#d97706]',
    trend_up: 'text-[#16a34a]',
    trend_down: 'text-[#dc2626]',
  },
  danger: {
    icon: 'bg-[#fee2e2] text-[#dc2626]',
    trend_up: 'text-[#16a34a]',
    trend_down: 'text-[#dc2626]',
  },
  info: {
    icon: 'bg-[#dbeafe] text-[#2563eb]',
    trend_up: 'text-[#16a34a]',
    trend_down: 'text-[#dc2626]',
  },
};

const TrendArrow = ({ trend }) => {
  if (trend === 'up') return (
    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 3l5 6H3L8 3z" />
    </svg>
  );
  if (trend === 'down') return (
    <svg className="w-3 h-3 rotate-180" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 3l5 6H3L8 3z" />
    </svg>
  );
  return null;
};

const KPICard = ({
  title,
  value,
  unit,
  icon,
  trend = 'neutral',
  trendLabel,
  color = 'primary',
  loading = false,
  className = '',
}) => {
  const palette = colorMap[color] ?? colorMap.primary;
  const trendColor = trend === 'up' ? palette.trend_up : trend === 'down' ? palette.trend_down : 'text-[#737686]';

  if (loading) {
    return (
      <div className={`bg-white rounded-lg border border-[#e2e8f0] p-5 animate-pulse ${className}`}>
        <div className="flex justify-between items-start mb-4">
          <div className="h-3 w-24 bg-[#e2e8f0] rounded" />
          <div className="h-10 w-10 bg-[#e2e8f0] rounded-lg" />
        </div>
        <div className="h-7 w-20 bg-[#e2e8f0] rounded mb-2" />
        <div className="h-3 w-32 bg-[#e2e8f0] rounded" />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-[#e2e8f0] p-5 ${className}`}>
      <div className="flex justify-between items-start mb-3">
        <p className="text-xs font-semibold text-[#737686] uppercase tracking-wider">{title}</p>
        {icon && (
          <span className={`flex items-center justify-center w-10 h-10 rounded-lg shrink-0 ${palette.icon}`}>
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-2xl font-bold text-[#131b2e] leading-none">{value}</span>
        {unit && <span className="text-sm font-medium text-[#737686]">{unit}</span>}
      </div>

      {trendLabel && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
          <TrendArrow trend={trend} />
          <span>{trendLabel}</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;
