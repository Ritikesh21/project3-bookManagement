const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT,
  mongoDb: process.env.mongoDb,
  secretKey : process.env.secretKey
};