const config = require("../config");
const winstonLogger = require("../utils/logger");
const client = require("amqplib");

const log = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  "authQueueConnection",
  "debug"
);

async function createConnection() {
  try {
    const connection = await client.connect(config.RABBITMQ_ENDPOINT);
    const channel = await connection.createChannel();
    log.info("Auth server connected to queue successfully...");
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log("error", "AuthService createConnection() method error:", error);
    return undefined;
  }
}

function closeConnection(channel, connection) {
  process.once("SIGINT", async () => {
    await channel.close();
    await connection.close();
  });
}

module.exports = {
  createConnection,
  closeConnection,
};
