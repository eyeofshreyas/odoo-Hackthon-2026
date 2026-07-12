const { allowRoles } = require('../middleware/rbac');

test('allowRoles rejects a role not in the allow-list', () => {
  const req = { user: { role: 'Driver' } };
  const res = {
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
  const next = jest.fn();

  allowRoles('Fleet Manager')(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.statusCode).toBe(403);
  expect(res.body.success).toBe(false);
});

test('allowRoles passes a role in the allow-list', () => {
  const req = { user: { role: 'Fleet Manager' } };
  const res = {};
  const next = jest.fn();

  allowRoles('Fleet Manager')(req, res, next);

  expect(next).toHaveBeenCalled();
});
