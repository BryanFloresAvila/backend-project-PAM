const mongoose = require('mongoose');
const connectDB = async () => {
  const DB_URI = process.env.DB_URI;
  try {
    await mongoose.connect(DB_URI);
    console.log('MongoDB connected...');
  } catch (error) {
    console.log('Error connecting to database: ');
    console.error(error.message);
  }
};

module.exports = connectDB;
