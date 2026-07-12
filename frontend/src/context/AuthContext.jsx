/**
 * AuthContext
 * TODO: Implement in Phase 3
 */
import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);
export const useAuthContext = () => useContext(AuthContext);
// placeholder
