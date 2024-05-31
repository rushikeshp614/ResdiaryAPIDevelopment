const Bottleneck = require("bottleneck");

const rateLimiter = new Bottleneck({
  maxConcurrent: 5,
  minTime: 200,
});

module.exports = rateLimiter;
