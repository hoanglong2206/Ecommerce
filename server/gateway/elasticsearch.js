const winstonLogger = require("./utils/logger");
const config = require("./config");
const { Client } = require("@elastic/elasticsearch");

const log = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  "gatewayElastic",
  "debug"
);

class ElasticSearch {
  constructor() {
    this.elasticSearchClient = new Client({
      node: `${config.ELASTIC_SEARCH_URL}`,
    });
  }

  async checkConnection() {
    let isConnected = false;
    while (!isConnected) {
      log.info("Connecting to ElasticSearch");
      try {
        const health = await this.elasticSearchClient.cluster.health({});
        log.info(
          `GatewayService ElasticSearch health status - ${health.status}`
        );
        isConnected = true;
      } catch (error) {
        log.error("Connection failed, retrying...");
        log.log(
          "error",
          "GatewayService ElasticSearch connection error",
          error
        );
      }
    }
  }
}

module.exports = new ElasticSearch();
