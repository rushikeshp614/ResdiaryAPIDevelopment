const axios = require("axios");
const Bottleneck = require("bottleneck");
const { getCurrentDate, getStartDate } = require("../utils/getDates");

const rateLimiter = new Bottleneck({
  maxConcurrent: 5, // Allow up to 5 concurrent requests
  minTime: 200, // Minimum time between requests in ms
});

const MAX_RETRIES = 3; // Number of retries for requests
const TIMEOUT = 5000; // Timeout for axios requests in ms

const deploymentId = 1;
const providerIds = [
  6214, 7461, 10412, 5277, 4219, 3384, 3553, 8434, 6767, 3613, 10528, 3183, 3345, 13388, 22398, 3374, 3416, 3383, 19081,
];

// Retry logic with timeout and enhanced error handling
const makeRequest = async (url, token, retries = MAX_RETRIES) => {
  try {
    const response = await rateLimiter.schedule(() =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: TIMEOUT, // Set timeout to avoid long hangs
      })
    );
    return response.data; // Return data if successful
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      console.error("Request timeout, returning null.");
      return null; // Handle timeout
    }

    if (retries > 0 && error.response && [500, 501, 502, 503, 504, 520].includes(error.response.status)) {
      console.warn(`Retrying ${retries} more times due to error: ${error.message}`);
      return makeRequest(url, token, retries - 1); // Retry on server errors
    }

    if (error.response && error.response.status === 520) {
      console.error(`Received 520 error, returning empty array.`);
      return []; // Handle specific server error with default response
    }

    throw new Error(`Unhandled error: ${error.message}`); // Re-throw unhandled errors
  }
};

// Enhanced customer details fetching with retry and logging
const getCustomerDetails = async (token, startDate) => {
  const allCustomerData = [];
  const url = `https://api.resdiary.com/api/ConsumerApi/v1/DataExtract/Restaurant/${deploymentId}/6214/Customers?fromCreationDate=${startDate}`;

  let nextPageUrl = url;
  let currentPage = 1;

  while (nextPageUrl) {
    try {
      const response = await rateLimiter.schedule(() => makeRequest(nextPageUrl, token)); // Use retry logic

      if (response) {
        const totalPages = response.TotalPages || currentPage;
        console.log(`Received customer data for page ${currentPage} of ${totalPages}`); // Log the page count

        allCustomerData.push(response.Data);
        nextPageUrl = response.NextUrl
          ? `https://api.resdiary.com/${response.NextUrl}`
          : null; // Check if there's a next page
        currentPage++; // Increment page count
      }
    } catch (error) {
      console.error(`Error while fetching customer data: ${error.message}`);
      break; // Exit loop on unhandled errors
    }
  }

  return allCustomerData.flat(); // Flatten nested arrays into a single array
};

// Generic API request with retry logic
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
// Data fetching with enhanced error handling and logging
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
    
    const responses = await Promise.all(requests); // Execute concurrent requests
    results.push(...responses.filter((res) => res !== null)); // Keep non-null results

    startDateFrom.setDate(startDateFrom.getDate() + 1); // Increment the date
  }

  return results.flat(); // Flatten nested arrays into a single array
};

// Define the fetch function for customer modification details
const getCustomerModificationDetails = (token, startDate) => fetchData("CustomerChange", token, startDate);

module.exports = { getCustomerDetails, getCustomerModificationDetails };
