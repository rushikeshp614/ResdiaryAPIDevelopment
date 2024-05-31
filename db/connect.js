const logger = require('../config/loggerConfig'); 
const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    logger.info("Connected to MongoDB!");
  } catch (error) {
    logger.error("Error connecting to MongoDB:", error);
    throw error; 
  }
};

module.exports = connectDB;
