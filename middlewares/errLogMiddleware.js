const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});
