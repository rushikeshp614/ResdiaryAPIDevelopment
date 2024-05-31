const logger = require('../config/loggerConfig');
const customerService = require('../services/customerService');
const getAccessToken = require('../services/authService');
const { getStartDate } = require('../utils/getDates');


const getAndInsertCustomerDetails = async (insertCustomerData) => {
  try {
    const token = await getAccessToken();
    const startDate = getStartDate("2024-05-15");
    await customerService.getCustomerDetailsAndInsert(token, startDate, insertCustomerData);
  } catch (error) {
    logger.error(`Error in getAndInsertCustomerDetails: ${error.message}`);
  }
};

const getAndInsertCustomerModificationDetails = async (insertCustomerModificationData) => {
  try {
    const token = await getAccessToken();
    const startDate = getStartDate("2024-05-15");
    await customerService.getCustomerModificationDetailsAndInsert(token, startDate, insertCustomerModificationData);
  } catch (error) {
    logger.error(`Error in getAndInsertCustomerModificationDetails: ${error.message}`);
  }
};

module.exports = { getAndInsertCustomerDetails, getAndInsertCustomerModificationDetails };
