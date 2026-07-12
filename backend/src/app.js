const express = require('express');
const cors = require('cors');
const { error } = require('./utils/apiResponse');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'OK', data: {} });
});

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/vehicles', require('./routes/vehicleRoutes'));

// route mounts added in later tasks

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  error(res, 'Internal server error', 500);
});

module.exports = app;
