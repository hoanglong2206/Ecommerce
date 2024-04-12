const dotenv = require("dotenv");

dotenv.config({});

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  JWT_TOKEN: process.env.JWT_TOKEN,
  GATEWAY_JWT_TOKEN: process.env.GATEWAY_JWT_TOKEN,
  RABBITMQ_ENDPOINT: process.env.RABBITMQ_ENDPOINT,
  MYSQL_DB: process.env.MYSQL_DB,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET,
  API_GATEWAY_URL: process.env.API_GATEWAY_URL,
  CLIENT_URL: process.env.CLIENT_URL,
  ELASTIC_SEARCH_URL: process.env.ELASTIC_SEARCH_URL,
};
