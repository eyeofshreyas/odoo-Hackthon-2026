/**
 * Auth API: login, signup, getMe.
 * All functions use the configured axios instance (src/api/axios.js)
 * and unwrap the backend's { success, message, data } envelope.
 */
import api from './axios';

export const login = ({ email, password }) =>
  api.post('/auth/login', { email, password }).then((res) => res.data.data);

export const signup = ({ name, email, password, roleName }) =>
  api.post('/auth/signup', { name, email, password, roleName }).then((res) => res.data.data);

export const getMe = () => api.get('/auth/me').then((res) => res.data.data);
