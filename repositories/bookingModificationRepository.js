const logger = require('../config/loggerConfig');
const BookingModification = require('../models/bookingModificationModel');

async function insertBookingModificationData(dataArray) {
  try {
    const batchSize = 100; 

    for (let i = 0; i < dataArray.length; i += batchSize) {
      const batch = dataArray.slice(i, i + batchSize);
      
      const documents = [];
      for (const data of batch) {
        
        const existingModification = await BookingModification.findOne({BookingId: data.BookingId,ChangeDateTime: data.ChangeDateTime });
        if (!existingModification) {
          documents.push(data);
        } 
        else {
          logger.info(`Skipping data insertion for BookingId with datetime: ${data.ChangeDateTime} as modification data already exists.`);
        }
      }
     
      if (documents.length > 0) {
        await BookingModification.insertMany(documents, { ordered: false });
        logger.info(`Inserted ${documents.length} documents.`);
      }
    }
  } catch (error) {
    if (error.code === 11000) {
      logger.error("Duplicate key error:", error.message);
    } else {
      throw error; 
    }
  }
}

module.exports = insertBookingModificationData;