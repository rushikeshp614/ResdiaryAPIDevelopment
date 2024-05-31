
const insertBookingData = require('./bookingRespository');
const insertBookingModificationData = require('./bookingModificationRepository');
const insertCustomerData = require('./customerRepository');
const insertCustomerModificationData = require('./customerModificationRepository');

module.exports = {
  insertBookingData,
  insertBookingModificationData,
  insertCustomerData,
  insertCustomerModificationData,
};
