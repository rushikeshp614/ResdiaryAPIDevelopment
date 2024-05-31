const axios = require("axios");
const rateLimiter = require('../middlewares/rateLimiter');
const authService = require('./authService');
const logger = require('../config/loggerConfig');

const MAX_RETRIES = 3;
const TIMEOUT = 5000;

const makeRequest = async (url, token, retries = MAX_RETRIES) => {
  try {
    const response = await rateLimiter.schedule(() =>
      axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: TIMEOUT,
      })
    );
    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      if (retries > 0) {
        logger.warn(`Request timeout for ${id} on ${formattedDate}. Retrying ${retries} more times.`);
        return await makeRequest(url, token, id, formattedDate, retries - 1);
      } else {
        logger.error(`Request timeout for ${id} on ${formattedDate} after ${MAX_RETRIES} retries, returning null.`);
        return null;
      }
    }

    if (retries > 0 && error.response && [500, 501, 502, 503, 504, 520].includes(error.response.status)) {
      logger.warn(`Retrying ${retries} more times due to error: ${error.message}`);
      return await makeRequest(url, token, retries - 1);
    } else if (error.response && [500, 501, 502, 503, 504, 520].includes(error.response.status)) {
      logger.error(`Error for ${url} after ${MAX_RETRIES} retries, returning null: ${error.message}`);
      return null;
    }

    if (error.response && error.response.status === 401) {
      logger.warn(`Token expired for ${id} on ${formattedDate}, refreshing token`);
      const newToken = await authService.getAccessToken();
      return await makeRequest(url, newToken, id, formattedDate, retries);
    }

    logger.error(`Unhandled error for ${id} on ${formattedDate}: ${error.message}`);
    throw new Error(`Unhandled error: ${error}`);
  }
};

const apiRequest = async (url, token, id, formattedDate, retries = MAX_RETRIES) => {
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: TIMEOUT,
    });
    logger.info(`API hit for ${id} on ${formattedDate}`);
    return response.data;
  } catch (error) {
    
    if (error.code === "ECONNABORTED") {
      if (retries > 0) {
        logger.warn(`Request timeout for ${id} on ${formattedDate}. Retrying ${retries} more times.`);
        return await apiRequest(url, token, id, formattedDate, retries - 1);
      } else {
        logger.error(`Request timeout for ${id} on ${formattedDate} after ${MAX_RETRIES} retries, returning null.`);
        return null;
      }
    }

    if (retries > 0 && error.response && [500, 501, 502, 503, 504, 520].includes(error.response.status)) {
      logger.warn(`Retrying ${retries} more times due to error: ${error.message}`);
      return await apiRequest(url, token, retries - 1);
    } else if (error.response && [500, 501, 502, 503, 504, 520].includes(error.response.status)) {
      logger.error(`Error for ${url} after ${MAX_RETRIES} retries, returning null: ${error.message}`);
      return null;
    }

    if (error.response && error.response.status === 401) {
      logger.warn(`Token expired for ${id} on ${formattedDate}, refreshing token`);
      const newToken = await authService.getAccessToken();
      return await apiRequest(url, newToken, id, formattedDate, retries);
    }

    logger.error(`Unhandled error for ${id} on ${formattedDate}: ${error.message}`);
    throw new Error(`Unhandled error: ${error}`);
  }
};

module.exports = { makeRequest, apiRequest };
