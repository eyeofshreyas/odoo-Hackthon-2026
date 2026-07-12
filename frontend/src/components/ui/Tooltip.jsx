import { useState } from 'react';

/**
 * Tooltip — Hover tooltip.
 *
 * @prop {string|React.ReactNode} content
 * @prop {'top'|'bottom'|'left'|'right'} placement
 * @prop {string} className
 */

const placementStyles = {
  top: {
    wrapper: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    arrow: 'top-full left-1/2 -translate-x-1/2 border-t-[#1e293b] border-x-transparent border-b-transparent border-t-4 border-x-4 border-b-0',
  },
  bottom: {
    wrapper: 'top-full left-1/2 -translate-x-1/2 mt-2',
    arrow: 'bottom-full left-1/2 -translate-x-1/2 border-b-[#1e293b] border-x-transparent border-t-transparent border-b-4 border-x-4 border-t-0',
  },
  left: {
    wrapper: 'right-full top-1/2 -translate-y-1/2 mr-2',
    arrow: 'left-full top-1/2 -translate-y-1/2 border-l-[#1e293b] border-y-transparent border-r-transparent border-l-4 border-y-4 border-r-0',
  },
  right: {
    wrapper: 'left-full top-1/2 -translate-y-1/2 ml-2',
    arrow: 'right-full top-1/2 -translate-y-1/2 border-r-[#1e293b] border-y-transparent border-l-transparent border-r-4 border-y-4 border-l-0',
  },
};

const Tooltip = ({
  children,
  content,
  placement = 'top',
  className = '',
}) => {
  const [visible, setVisible] = useState(false);
  const styles = placementStyles[placement] ?? placementStyles.top;

  if (!content) return children;

  return (
    <span
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={[
            'absolute z-50 pointer-events-none px-2 py-1 text-xs font-medium text-white bg-[#1e293b] rounded-md whitespace-nowrap shadow-md',
            styles.wrapper,
          ].join(' ')}
        >
          {content}
          <span className={`absolute w-0 h-0 border-solid ${styles.arrow}`} aria-hidden="true" />
        </span>
      )}
    </span>
  );
};

export default Tooltip;
