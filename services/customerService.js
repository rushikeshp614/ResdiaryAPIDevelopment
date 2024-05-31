const { makeRequest, apiRequest } = require('./apiService');
const { getCurrentDate, getStartDate } = require("../utils/getDates");
const logger = require('../config/loggerConfig');
const rateLimiter = require('../middlewares/rateLimiter');

const domainName = process.env.DOMAIN_NAME
const deploymentId = 1;
const providerIds = [
  6214, 7461, 10412, 5277, 4219, 3384, 3553, 8434, 6767, 3613, 10528, 3183, 3345, 13388, 22398, 3374, 3416, 3383, 19081,
];

const fetchAndInsertCustomerData = async (endpoint, token, startDate, insertData) => {
  const custCreateDate = startDate.toISOString().split("T")[0];
  const urlTemplate = `${domainName}/${deploymentId}/6214/${endpoint}?fromCreationDate=${custCreateDate}&pageNumber={page}&pageSize=100`;
  let nextPage = 1;
  let hasMorePages = true;

  while (hasMorePages) {
    const url = urlTemplate.replace('{page}', nextPage);
    try {
      const response = await makeRequest(url, token);
      if (response) {

        const totalPages = response.TotalPages
        logger.info(`Received customer data for page ${nextPage} of total pages ${totalPages}`);

        await insertData(response.Data);

        hasMorePages = !!response.NextUrl;
        nextPage++;
      }
    } catch (error) {
      logger.error(`Error while fetching customer data: ${error.message}`);
      break;
    }
  }
};

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

const getCustomerDetailsAndInsert = async (token, startDate, insertCustomerData) => {
  return fetchAndInsertCustomerData("Customers", token, startDate, insertCustomerData);
};

const getCustomerModificationDetailsAndInsert = async (token, startDate, insertCustomerModificationData) => {
  return fetchDataAndInsert("CustomerChange", token, startDate, insertCustomerModificationData);
};

module.exports = { getCustomerDetailsAndInsert, getCustomerModificationDetailsAndInsert };
