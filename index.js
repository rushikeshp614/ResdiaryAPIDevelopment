const MONGO_URI = require('./config/mongoDBConfig');
const connectDB = require('./db/connect');
const { getAndInsertBookingsDetails, getAndInsertBookingModificationDetails } = require('./controllers/bookingController');
const { getAndInsertCustomerDetails, getAndInsertCustomerModificationDetails } = require('./controllers/customerController');
const { insertBookingData, insertBookingModificationData, insertCustomerData, insertCustomerModificationData } = require('./repositories');
const logger = require('./config/loggerConfig');

(async () => {
    try { 
        await connectDB(MONGO_URI); 
        logger.info("Database connection started");

        await getAndInsertBookingsDetails(insertBookingData);
        logger.info("Booking details retrieved and stored successfully");

        await getAndInsertBookingModificationDetails(insertBookingModificationData);
        logger.info("Booking modification details retrieved and stored successfully");

        await getAndInsertCustomerDetails(insertCustomerData);
        logger.info("Customer details retrieved and stored successfully");

        await getAndInsertCustomerModificationDetails(insertCustomerModificationData);
        logger.info("Customer modification details retrieved and stored successfully");

    } catch (error) {
        logger.error(error.message);
    } finally {
        logger.info("Database connection closed");
        process.exit();
    }
})();
