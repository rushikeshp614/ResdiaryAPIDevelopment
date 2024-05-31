const logger = require('../config/loggerConfig');
const Booking = require('../models/bookingModel');

async function insertBookingData(dataArray) {
    try {
      const batchSize = 100; 
      for (let i = 0; i < dataArray.length; i += batchSize) {
        const batch = dataArray.slice(i, i + batchSize);
        const documents = [];
        for (const data of batch) {
          const existingBooking = await Booking.findOne({ Id: data.Id });
          if (!existingBooking) {
            documents.push(data);
          } else {
            logger.info(`Skipping data insertion for BookingId: ${data.Id} as it already exists.`);
          }
        }
        if (documents.length > 0) {
          await Booking.insertMany(documents, { ordered: false });
          logger.info(`Inserted ${documents.length} documents into Booking collection.`);
        }
      }
    } catch (error) {
      logger.error("Error inserting data:", error);
    }
  }
  
  module.exports = insertBookingData;