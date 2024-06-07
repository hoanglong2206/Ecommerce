const winstonLogger = require("./utils/logger");
const config = require("./config");
const { Client } = require("@elastic/elasticsearch");

const log = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  "userElastic",
  "debug"
);

const elasticClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`,
});

async function checkConnection() {
  let isConnected = false;
  while (!isConnected) {
    log.info("UserService connecting to ElasticSearch...");
    try {
      const health = await elasticClient.cluster.health({});
      log.info(`UserService Elasticsearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error("Connection to Elasticsearch failed. Retrying...");
      log.log("error", "UserService checkConnection() method:", error);
    }
  }
}

module.exports = { checkConnection, elasticClient };
