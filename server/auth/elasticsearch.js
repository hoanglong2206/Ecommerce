const winstonLogger = require("./utils/logger");
const config = require("./config");
const { Client } = require("@elastic/elasticsearch");

const log = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  "authElastic",
  "debug"
);

const elasticClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`,
});

async function checkConnection() {
  let isConnected = false;
  while (!isConnected) {
    log.info("AuthService connecting to ElasticSearch...");
    try {
      const health = await elasticClient.cluster.health({});
      log.info(`AuthService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error("Connection to Elasticsearch failed. Retrying...");
      log.log("error", "AuthService checkConnection() method:", error);
    }
  }
}

module.exports = { checkConnection };
