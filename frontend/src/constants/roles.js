/**
 * ROLES — must match backend Role.roleName exactly (backend/src/models/Role.js).
 */
export const ROLES = {
  FLEET_MANAGER: 'Fleet Manager',
  DRIVER: 'Driver',
  SAFETY_OFFICER: 'Safety Officer',
  FINANCIAL_ANALYST: 'Financial Analyst',
};

export const ROLE_OPTIONS = Object.values(ROLES);
