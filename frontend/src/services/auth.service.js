/**
 * auth.service.js
 * Mock authentication service — simulates backend calls with delays.
 * Replace the function bodies with real API calls in a later phase.
 */

const MOCK_USERS_KEY = 'transitops_users';
const SESSION_KEY    = 'transitops_session';

/* ── Helpers ── */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(MOCK_USERS_KEY) ?? '[]');
  } catch {
    return [];
  }
};

const saveUsers = (users) =>
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));

/* ── Public API ── */

/**
 * login({ email, password, remember })
 * Returns { user } on success, throws Error on failure.
 */
export const login = async ({ email, password, remember = false }) => {
  await delay(1400); // simulate network

  const users = getUsers();
  const user  = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );

  if (!user) {
    throw new Error('Invalid email or password. Please try again.');
  }

  const session = { id: user.id, name: user.name, email: user.email, role: user.role };

  if (remember) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }

  return { user: session };
};

/**
 * signup({ name, email, password, role })
 * Returns { user } on success, throws Error on failure.
 */
export const signup = async ({ name, email, password, role }) => {
  await delay(1600); // simulate network

  const users = getUsers();
  const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());

  if (exists) {
    throw new Error('An account with this email already exists. Please log in.');
  }

  const newUser = {
    id:       `usr_${Date.now()}`,
    name,
    email,
    password, // NOTE: in a real app, never store plain-text passwords
    role,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);

  const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));

  return { user: session };
};

/**
 * logout() — clears the session.
 */
export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
};

/**
 * getSession() — returns the current session or null.
 */
export const getSession = () => {
  try {
    const raw =
      localStorage.getItem(SESSION_KEY) ??
      sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
