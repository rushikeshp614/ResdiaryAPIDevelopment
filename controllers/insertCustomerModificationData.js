

const CustomerModification = require('../models/customerModificationModel');

async function insertCustomerModificationData(dataArray) {
  try {
    const batchSize = 100; // Adjust the batch size as needed
    for (let i = 0; i < dataArray.length; i += batchSize) {
      const batch = dataArray.slice(i, i + batchSize);
      const documents = [];
      for (const data of batch) {
        const existingModification = await CustomerModification.findOne({ CustomerId : data.CustomerId, ModifiedDateTime: data.ModifiedDateTime });
        if (!existingModification) {
          documents.push(data);
        } 
        // else {
        //   console.log(`Skipping data insertion for CustomerId of modification date: ${data.ModifiedDateTime} as modification data already exists.`);
        // }
      }
      if (documents.length > 0) {
        await CustomerModification.insertMany(documents, { ordered: false });
        console.log(`Inserted ${documents.length} documents into CustomerModification collection.`);
      }
    }
  } catch (error) {
    console.error("Error inserting data into CustomerModification collection:", error);
  }
}

module.exports = insertCustomerModificationData;
