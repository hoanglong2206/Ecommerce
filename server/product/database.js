const winstonLogger = require("./utils/logger");
const config = require("./config");
const mongoose = require("mongoose");

const log = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  "userDatabase",
  "debug"
);

async function databaseConnection() {
  try {
    await mongoose.connect(`${config.MONGO_DB}`);
    log.info(
      "User Service Mongodb database connection has been established successfully."
    );
  } catch (error) {
    log.error("User Service - Unable to connect to database.");
    log.log("error", "User Service - Unable to connect to database.");
  }
}

module.exports = { databaseConnection };
