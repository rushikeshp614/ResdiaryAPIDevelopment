const { makeRequest, apiRequest } = require('./apiService');
const { getCurrentDate, getStartDate } = require("../utils/getDates");
const logger = require('../config/loggerConfig');
const rateLimiter = require('../middlewares/rateLimiter');

const domainName = process.env.DOMAIN_NAME
const deploymentId = 1;
const providerIds = [
  6214, 7461, 10412, 5277, 4219, 3384, 3553, 8434, 6767, 3613, 10528, 3183, 3345, 13388, 22398, 3374, 3416, 3383, 19081,
];

const fetchDataAndInsert = async (endpoint, token, startDate, insertData) => {
  const currentDate = getCurrentDate();
  let startDateFrom = getStartDate(startDate);

  while (startDateFrom <= currentDate) {
    const formattedDate = startDateFrom.toISOString().split("T")[0];

    const requests = providerIds.map((id) =>
      rateLimiter.schedule(() =>
        apiRequest(
          `${domainName}/${deploymentId}/${id}/${endpoint}/${formattedDate}`,
          token,
          id,
          formattedDate
        ).then(data => ({ providerId: id, data }))
      )
    );

    const responses = await Promise.all(requests);

    for (const response of responses) {
      if (response.data !== null) {
        await insertData(response.data);
      }
    }

    startDateFrom.setDate(startDateFrom.getDate() + 1);
  }
};

const getBookingsDetailsAndInsert = async (token, startDate, insertBookingData) => {
  return fetchDataAndInsert("Booking", token, startDate, insertBookingData);
};

const getBookingModificationDetailsAndInsert = async (token, startDate, insertBookingModificationData) => {
  return fetchDataAndInsert("BookingChange", token, startDate, insertBookingModificationData);
};

module.exports = { getBookingsDetailsAndInsert, getBookingModificationDetailsAndInsert };
