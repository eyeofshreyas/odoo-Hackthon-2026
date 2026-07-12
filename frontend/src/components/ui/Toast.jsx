import { useEffect, useRef } from 'react';

/**
 * Toast — Single toast notification item.
 * Use with useToast hook or ToastContainer.
 *
 * @prop {string} id
 * @prop {'success'|'error'|'warning'|'info'} type
 * @prop {string} title
 * @prop {string} message
 * @prop {number} duration     — ms before auto-dismiss (0 = no auto-dismiss)
 * @prop {() => void} onClose
 */

const toastConfig = {
  success: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    ),
    colors: 'border-l-[#16a34a] bg-white',
    iconColor: 'text-[#16a34a]',
  },
  error: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
      </svg>
    ),
    colors: 'border-l-[#dc2626] bg-white',
    iconColor: 'text-[#dc2626]',
  },
  warning: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
    colors: 'border-l-[#d97706] bg-white',
    iconColor: 'text-[#d97706]',
  },
  info: {
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
      </svg>
    ),
    colors: 'border-l-[#2563eb] bg-white',
    iconColor: 'text-[#2563eb]',
  },
};

export const Toast = ({ id, type = 'info', title, message, duration = 4000, onClose }) => {
  const config = toastConfig[type] ?? toastConfig.info;
  const timerRef = useRef(null);

  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => onClose?.(id), duration);
    }
    return () => clearTimeout(timerRef.current);
  }, [duration, id, onClose]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={[
        'w-80 flex items-start gap-3 px-4 py-3 rounded-lg border border-[#e2e8f0] border-l-4 shadow-[0_8px_24px_rgba(0,0,0,0.12)] pointer-events-auto',
        config.colors,
      ].join(' ')}
    >
      <span className={`shrink-0 mt-0.5 ${config.iconColor}`}>{config.icon}</span>

      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold text-[#131b2e]">{title}</p>}
        {message && <p className="text-xs text-[#737686] mt-0.5 leading-relaxed">{message}</p>}
      </div>

      <button
        type="button"
        onClick={() => onClose?.(id)}
        aria-label="Dismiss notification"
        className="shrink-0 p-1 rounded text-[#737686] hover:text-[#131b2e] hover:bg-[#f1f5f9] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2563eb]"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M2 2l12 12M14 2L2 14" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

/**
 * ToastContainer — Portal-like fixed container for toasts.
 *
 * @prop {{ id, type, title, message, duration }[]} toasts
 * @prop {(id: string) => void} onClose
 * @prop {'top-right'|'top-left'|'bottom-right'|'bottom-left'|'top-center'|'bottom-center'} position
 */

const positionMap = {
  'top-right': 'top-4 right-4 items-end',
  'top-left': 'top-4 left-4 items-start',
  'bottom-right': 'bottom-4 right-4 items-end',
  'bottom-left': 'bottom-4 left-4 items-start',
  'top-center': 'top-4 left-1/2 -translate-x-1/2 items-center',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2 items-center',
};

export const ToastContainer = ({
  toasts = [],
  onClose,
  position = 'top-right',
}) => {
  if (!toasts.length) return null;

  return (
    <div
      aria-label="Notifications"
      className={[
        'fixed z-[100] flex flex-col gap-2 pointer-events-none',
        positionMap[position] ?? positionMap['top-right'],
      ].join(' ')}
    >
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={onClose} />
      ))}
    </div>
  );
};

export default ToastContainer;
