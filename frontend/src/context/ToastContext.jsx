/**
 * ToastContext
 * TODO: Implement in Phase 3
 */
import { createContext, useContext } from 'react';

export const ToastContext = createContext(null);
export const useToastContext = () => useContext(ToastContext);
// placeholder
