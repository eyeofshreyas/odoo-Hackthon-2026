/**
 * auth.service.js
 * Talks to the real backend (src/api/auth.js) and keeps the JWT in
 * localStorage. The session's user profile (name/email/role) isn't in the
 * JWT payload, so login/signup fetch it via GET /auth/me right after
 * authenticating.
 */
import * as authApi from '../api/auth';
import { TOKEN_KEY } from '../api/axios';

/**
 * login({ email, password })
 * Returns { user } on success, throws on failure (axios error with
 * response.data.message from the backend's { success, message } shape).
 */
export const login = async ({ email, password }) => {
  const { token } = await authApi.login({ email, password });
  localStorage.setItem(TOKEN_KEY, token);

  const user = await authApi.getMe();
  return { user };
};

/**
 * signup({ name, email, password, role })
 * `role` must be one of the exact backend role names (see
 * constants/roles.js). Returns { user } on success, throws on failure.
 */
export const signup = async ({ name, email, password, role }) => {
  const { token } = await authApi.signup({ name, email, password, roleName: role });
  localStorage.setItem(TOKEN_KEY, token);

  const user = await authApi.getMe();
  return { user };
};

/**
 * logout() — clears the stored token.
 */
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * getSession() — returns the current user profile if a valid token is
 * stored, or null. Async because it must round-trip to /auth/me.
 */
export const getSession = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  try {
    return await authApi.getMe();
  } catch {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};
