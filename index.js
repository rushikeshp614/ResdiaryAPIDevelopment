const MONGO_URI = require('./config/mongoDBConfig')
const connectDB = require('./db/connect')
const getAccessToken = require('./services/authService')
const {getBookingsDetails} = require('./services/bookingService')
const {getBookingModificationDetails} = require('./services/bookingService')
const {getCustomerDetails, readAndParseCustomerData} = require('./services/customerService')
const {getCustomerModificationDetails} = require('./services/customerService')
const insertBookingData = require("./controllers/insertBookingData");
const insertBookingModificationData = require("./controllers/insertBookingModificationData")
const insertCustomerData = require('./controllers/insertCustomerData')
const insertCustomerModificationData = require('./controllers/insertCustomerModificationData')
const logger = require('./utils/logger');

(async () => {
    try {
        await connectDB(MONGO_URI);
        logger("Database connection started");

        const startDate = '2023-12-01';

        const token = await getAccessToken();
        logger("Access token retrieved successfully");

        // const bookingDetails = await getBookingsDetails(token, startDate);
        // logger("Booking details retrieved successfully");
        // await insertBookingData(bookingDetails);
        // logger("Data has been inserted in Booking collection");

        // const modifiedBookingsDetails = await getBookingModificationDetails(token, startDate);
        // logger("Modified bookings retrieved successfully");
        // await insertBookingModificationData(modifiedBookingsDetails);
        // logger("Data has been inserted in BookingModification collection");

      


        const customerDetails = await getCustomerDetails(token, startDate);  // Pass the token and other required parameters
        logger("Customer details retrieved successfully");
        
        // const customerDetails = await readAndParseCustomerData();  // Parse the data
        // logger("All customer data processed");
       
        await insertCustomerData(customerDetails);
        logger("Data has been inserted in Customer collection");

       

        // const modifiedCustomerDetails = await getCustomerModificationDetails(token, startDate);
        // logger("Modified customer details retrieved successfully");
        // await insertCustomerModificationData(modifiedCustomerDetails);
        // logger("Data has been inserted in CustomerModification collection");

    } catch (error) {
        logger(error.message);
    } finally {
        logger("Database connection closed");
        process.exit();
    }
})();
