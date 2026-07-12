const { error } = require('../utils/apiResponse');

function allowRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return error(res, 'Forbidden: insufficient role', 403);
    }
    next();
  };
}

module.exports = { allowRoles };
