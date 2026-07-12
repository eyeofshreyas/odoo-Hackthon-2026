import { useState } from 'react';

/**
 * Tabs — Horizontal tab navigation.
 *
 * @prop {{ key: string, label: string, icon?: React.ReactNode, disabled?: boolean }[]} tabs
 * @prop {string} activeKey   — controlled active tab key
 * @prop {(key: string) => void} onChange
 * @prop {'line'|'pill'} variant
 * @prop {string} className
 */
const Tabs = ({
  tabs = [],
  activeKey,
  onChange,
  variant = 'line',
  className = '',
}) => {
  const [localActive, setLocalActive] = useState(tabs[0]?.key ?? '');
  const active = activeKey ?? localActive;

  const handleClick = (key) => {
    setLocalActive(key);
    onChange?.(key);
  };

  if (variant === 'pill') {
    return (
      <div role="tablist" aria-label="Tabs" className={`flex items-center gap-1 bg-[#f1f5f9] p-1 rounded-lg ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            role="tab"
            type="button"
            disabled={tab.disabled}
            aria-selected={active === tab.key}
            onClick={() => !tab.disabled && handleClick(tab.key)}
            className={[
              'flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]',
              active === tab.key
                ? 'bg-white text-[#131b2e] shadow-sm'
                : 'text-[#737686] hover:text-[#131b2e]',
              tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
          >
            {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  // Default: line variant
  return (
    <div role="tablist" aria-label="Tabs" className={`flex items-center border-b border-[#e2e8f0] ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          type="button"
          disabled={tab.disabled}
          aria-selected={active === tab.key}
          onClick={() => !tab.disabled && handleClick(tab.key)}
          className={[
            'flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-inset',
            active === tab.key
              ? 'border-[#2563eb] text-[#2563eb]'
              : 'border-transparent text-[#737686] hover:text-[#131b2e] hover:border-[#c3c6d7]',
            tab.disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
          ].join(' ')}
        >
          {tab.icon && <span className="w-4 h-4 shrink-0">{tab.icon}</span>}
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
