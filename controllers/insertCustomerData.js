
const Customer = require('../models/customerModel');

async function insertCustomerData(customersDataArray) {
  try {
    const batchSize = 1000; // Adjust the batch size as needed
    for (let i = 0; i < customersDataArray.length; i += batchSize) {
      const batch = customersDataArray.slice(i, i + batchSize);
      const documents = [];
    
      for (const customerData of batch) {
        const existingCustomer = await Customer.findOne({ Id: customerData.Id });
        if (!existingCustomer) {
          documents.push(customerData);
        } 
        // else {
        //   console.log(`Skipping data insertion for CustomerId: ${customerData.Id} as it already exists.`);
        // }
      }
      if (documents.length > 0) {
        await Customer.insertMany(documents, { ordered: false });
        console.log(`Inserted ${documents.length} documents into Customer collection.`);
      }
    }
  } catch (error) {
    console.error("Error inserting data into Customer collection:", error);
  }
}

module.exports = insertCustomerData;