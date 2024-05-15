const axios = require("axios");
const Bottleneck = require("bottleneck");
const { getCurrentDate, getStartDate } = require("../utils/getDates");

const deploymentId = 1;
const providerIds = [
  6214, 7461, 10412, 5277, 4219, 3384, 3553, 8434, 6767, 3613, 10528, 3183, 3345, 13388, 22398, 3374, 3416, 3383, 19081,
];

// Rate limiting configuration
const rateLimiter = new Bottleneck({
  maxConcurrent: 5, // Allow up to 5 concurrent requests
  minTime: 200, // Minimum time between requests in ms
});

const apiRequest = async (url, token, id, formattedDate) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`API hit for ${id} on ${formattedDate}`);
    return response.data;
  } catch (error) {
    if (error.response && [500, 501, 502, 503, 504, 505].includes(error.response.status)) {
      console.error(
        `API error ${error.response.status}: ${error.response.data} for restaurant id ${id} on ${formattedDate}`
      );
      return null; // Return null for these errors
    } else {
      throw error; // Rethrow other errors
    }
  }
};

const fetchData = async (endpoint, token, startDate) => {
  const currentDate = getCurrentDate();
  const startDateFrom = getStartDate(startDate);
  const results = [];

  while (startDateFrom <= currentDate) {
    const formattedDate = startDateFrom.toISOString().split("T")[0];
    const requests = providerIds.map((id) =>
      rateLimiter.schedule(() =>
        apiRequest(
          `https://api.resdiary.com/api/ConsumerApi/v1/DataExtract/Restaurant/${deploymentId}/${id}/${endpoint}/${formattedDate}`,
          token,
          id,
          formattedDate
        )
      )
    );

    const responses = await Promise.all(requests);
    results.push(...responses.filter((res) => res !== null)); // Filter out null responses
    startDateFrom.setDate(startDateFrom.getDate() + 1);
  }

  return results.flat(); // Flatten the nested arrays into a single array
};

const getBookingsDetails = (token, startDate) => fetchData("Booking", token, startDate);
const getBookingModificationDetails = (token, startDate) => fetchData("BookingChange", token, startDate);

module.exports = { getBookingsDetails, getBookingModificationDetails };
