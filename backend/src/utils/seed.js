const connectDB = require('../config/db');
const Role = require('../models/Role');

const ROLES = ['Fleet Manager', 'Driver', 'Safety Officer', 'Financial Analyst'];

async function seed() {
  await connectDB();
  for (const roleName of ROLES) {
    await Role.updateOne({ roleName }, { roleName }, { upsert: true });
  }
  console.log('Roles seeded:', ROLES.join(', '));
  process.exit(0);
}

seed();
