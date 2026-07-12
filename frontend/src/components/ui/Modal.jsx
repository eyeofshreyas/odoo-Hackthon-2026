import { useEffect, useRef } from 'react';

/**
 * Modal — Accessible dialog overlay.
 *
 * @prop {boolean} open
 * @prop {() => void} onClose
 * @prop {string} title
 * @prop {'sm'|'md'|'lg'|'xl'|'full'} size
 * @prop {React.ReactNode} footer
 * @prop {boolean} closeOnOverlay  — close when clicking backdrop
 * @prop {string} className
 */

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4',
};

const Modal = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlay = true,
  className = '',
}) => {
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);

  /* Focus trap & restore */
  useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement;
      // Delay to allow render
      requestAnimationFrame(() => {
        dialogRef.current?.focus();
      });
    } else {
      previousFocusRef.current?.focus?.();
    }
  }, [open]);

  /* Keyboard: Escape closes */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  /* Lock body scroll */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        aria-hidden="true"
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        className={[
          'relative w-full bg-white rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] flex flex-col max-h-[90vh] focus:outline-none',
          sizeMap[size] ?? sizeMap.md,
          className,
        ].join(' ')}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9] shrink-0">
          {title && (
            <h2 id="modal-title" className="text-base font-semibold text-[#131b2e]">{title}</h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="ml-auto p-1.5 rounded-md text-[#737686] hover:text-[#131b2e] hover:bg-[#f1f5f9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#f1f5f9] bg-[#f8fafc] shrink-0 rounded-b-xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
