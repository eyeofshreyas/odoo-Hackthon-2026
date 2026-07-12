const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');
const { success, error } = require('../utils/apiResponse');

function issueToken(user, roleName) {
  return jwt.sign({ id: user._id, role: roleName }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

async function signup(req, res) {
  const { name, email, password, roleName } = req.body;
  if (!name || !email || !password || !roleName) {
    return error(res, 'name, email, password, roleName are required');
  }

  const role = await Role.findOne({ roleName });
  if (!role) return error(res, 'Invalid role');

  const existing = await User.findOne({ email });
  if (existing) return error(res, 'Email already registered');

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, roleId: role._id });

  const token = issueToken(user, role.roleName);
  return success(res, 'Signup successful', { token }, 201);
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return error(res, 'email and password are required');

  const user = await User.findOne({ email }).populate('roleId');
  if (!user) return error(res, 'Invalid credentials', 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) return error(res, 'Invalid credentials', 401);

  const token = issueToken(user, user.roleId.roleName);
  return success(res, 'Login successful', { token });
}

async function getMe(req, res) {
  const user = await User.findById(req.user.id).populate('roleId');
  if (!user) return error(res, 'User not found', 404);

  return success(res, 'Current user fetched', {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.roleId.roleName,
  });
}

module.exports = { signup, login, getMe };
