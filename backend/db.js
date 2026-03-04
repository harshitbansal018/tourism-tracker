// db.js
require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI); // no need for options now
    console.log('✅ Connected to MongoDB Atlas');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;
