const winston = require('winston');
const expressWinston = require('express-winston');

module.exports = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});
