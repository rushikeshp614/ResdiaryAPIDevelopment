const Booking = require('../models/bookingModel');

async function insertBookingData(dataArray) {
    try {
      const batchSize = 1000; // Adjust the batch size as needed
      for (let i = 0; i < dataArray.length; i += batchSize) {
        const batch = dataArray.slice(i, i + batchSize);
        const documents = [];
        for (const data of batch) {
          const existingBooking = await Booking.findOne({ Id: data.Id });
          if (!existingBooking) {
            documents.push(data);
          } else {
            console.log(`Skipping data insertion for BookingId: ${data.Id} as it already exists.`);
          }
        }
        if (documents.length > 0) {
          await Booking.insertMany(documents, { ordered: false });
          console.log(`Inserted ${documents.length} documents into Booking collection.`);
        }
      }
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
  
  module.exports = insertBookingData;