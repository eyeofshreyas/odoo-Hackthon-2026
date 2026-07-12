import { useState, useCallback } from 'react';

/**
 * useToast — Lightweight toast state manager.
 *
 * Usage:
 *   const { toasts, toast, dismiss } = useToast();
 *   toast.success('Saved!', 'Changes saved successfully.');
 *   // In JSX: <ToastContainer toasts={toasts} onClose={dismiss} />
 */

let idCounter = 0;
const nextId = () => `toast-${++idCounter}`;

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((type, title, message, duration = 4000) => {
    const id = nextId();
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (title, message, duration) => add('success', title, message, duration),
    error:   (title, message, duration) => add('error',   title, message, duration),
    warning: (title, message, duration) => add('warning', title, message, duration),
    info:    (title, message, duration) => add('info',    title, message, duration),
  };

  return { toasts, toast, dismiss };
};

export default useToast;
