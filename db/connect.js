const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    await mongoose.connect(url); // No additional options needed
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error; // Propagate the error
  }
};

module.exports = connectDB;
