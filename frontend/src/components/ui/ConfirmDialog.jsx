import Modal from './Modal';
import Button from './Button';

/**
 * ConfirmDialog — Confirmation modal for destructive actions.
 *
 * @prop {boolean} open
 * @prop {() => void} onClose
 * @prop {() => void} onConfirm
 * @prop {string} title
 * @prop {string} message
 * @prop {'danger'|'warning'|'primary'} intent
 * @prop {string} confirmLabel
 * @prop {string} cancelLabel
 * @prop {boolean} loading    — shows loading state on confirm button
 */

const intentIcon = {
  danger: (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#fee2e2] mb-4 mx-auto">
      <svg className="w-6 h-6 text-[#dc2626]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  ),
  warning: (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#fef3c7] mb-4 mx-auto">
      <svg className="w-6 h-6 text-[#d97706]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
      </svg>
    </div>
  ),
  primary: (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#dbeafe] mb-4 mx-auto">
      <svg className="w-6 h-6 text-[#2563eb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" strokeLinecap="round" />
      </svg>
    </div>
  ),
};

const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  intent = 'danger',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      closeOnOverlay={!loading}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </Button>
          <Button
            variant={intent === 'danger' ? 'danger' : intent === 'warning' ? 'primary' : 'primary'}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="text-center py-2">
        {intentIcon[intent]}
        <h3 className="text-base font-semibold text-[#131b2e] mb-2">{title}</h3>
        <p className="text-sm text-[#737686]">{message}</p>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
