const logger = require('../config/loggerConfig');
const bookingService = require('../services/bookingService');
const getAccessToken = require('../services/authService');
const { getStartDate } = require('../utils/getDates');


const getAndInsertBookingsDetails = async (insertBookingData) => {
  try {
    const token = await getAccessToken();
    const startDate = getStartDate("2024-05-15");
    await bookingService.getBookingsDetailsAndInsert(token, startDate, insertBookingData);
  } catch (error) {
    logger.error(`Error in getAndInsertBookingsDetails: ${error.message}`);
  }
};

const getAndInsertBookingModificationDetails = async (insertBookingModificationData) => {
  try {
    const token = await getAccessToken();
    const startDate = getStartDate("2024-05-15");
    await bookingService.getBookingModificationDetailsAndInsert(token, startDate, insertBookingModificationData);
  } catch (error) {
    logger.error(`Error in getAndInsertBookingModificationDetails: ${error.message}`);
  }
};

module.exports = { getAndInsertBookingsDetails, getAndInsertBookingModificationDetails };
