const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const { error } = require('../utils/apiResponse');

function protect(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return error(res, 'Not authenticated', 401);

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    return error(res, 'Invalid or expired token', 401);
  }
}

module.exports = { protect };
