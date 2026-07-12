const mongoose = require('mongoose');
const { MONGO_URI } = require('./env');

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    throw new Error(`MongoDB connection failed: ${error.message}`);
  }
}

module.exports = connectDB;
