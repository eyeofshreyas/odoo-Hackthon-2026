/**
 * AuthContext.jsx
 * Provides authentication state and actions to the entire app.
 *
 * Exposes via useAuth():
 *   user         — { id, name, email, role } | null
 *   isAuth       — boolean
 *   isLoading    — boolean (initial session check)
 *   login(data)  — async
 *   signup(data) — async
 *   logout()     — sync
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authService from '../services/auth.service';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

// legacy alias kept for backward-compat with any existing usage
export const useAuthContext = () => useAuth();

export const AuthProvider = ({ children }) => {
  const [user, setUser]           = useState(null);
  const [isLoading, setIsLoading] = useState(true); // true during initial session restore

  /* ── Restore session on mount ── */
  useEffect(() => {
    const session = authService.getSession();
    setUser(session ?? null);
    setIsLoading(false);
  }, []);

  /* ── Actions ── */
  const login = useCallback(async (data) => {
    const { user: session } = await authService.login(data);
    setUser(session);
    return session;
  }, []);

  const signup = useCallback(async (data) => {
    const { user: session } = await authService.signup(data);
    setUser(session);
    return session;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    isAuth: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
