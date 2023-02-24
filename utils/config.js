const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_KEY: process.env.JWT_KEY || 'secret_key',
  MONGODB_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/bitfilmsdb',
};
