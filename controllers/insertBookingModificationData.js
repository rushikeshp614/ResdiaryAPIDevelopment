
const BookingModification = require('../models/bookingModificationModel');

async function insertBookingModificationData(dataArray) {
  try {
    const batchSize = 1000; // Adjust the batch size as needed
    // console.log(dataArray)
    for (let i = 0; i < dataArray.length; i += batchSize) {
      const batch = dataArray.slice(i, i + batchSize);
      
      const documents = [];
      for (const data of batch) {
        
        const existingModification = await BookingModification.findOne({BookingId: data.BookingId,ChangeDateTime: data.ChangeDateTime });
        if (!existingModification) {
          documents.push(data);
        } 
        else {
          console.log(`Skipping data insertion for BookingId with datetime: ${data.ChangeDateTime} as modification data already exists.`);
        }
      }
      // console.log(documents)
      if (documents.length > 0) {
        await BookingModification.insertMany(documents, { ordered: false });
        console.log(`Inserted ${documents.length} documents.`);
      }
    }
  } catch (error) {
    if (error.code === 11000) {
      console.error("Duplicate key error:", error.message);
    } else {
      throw error; // Re-throw other unexpected errors
    }
  }
}

module.exports = insertBookingModificationData;