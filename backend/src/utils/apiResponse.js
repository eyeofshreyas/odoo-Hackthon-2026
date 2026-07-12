function success(res, message, data = {}, status = 200) {
  return res.status(status).json({ success: true, message, data });
}

function error(res, message, status = 400) {
  return res.status(status).json({ success: false, message });
}

module.exports = { success, error };
