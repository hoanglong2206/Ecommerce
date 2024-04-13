const config = require("../config");
const winstonLogger = require("../utils/logger");
const { createConnection } = require("./connection");

const log = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  "authServiceProducer",
  "debug"
);

async function publishDirectMessage(
  channel,
  exchangeName,
  routingKey,
  message,
  logMessage
) {
  try {
    if (!channel) {
      channel = await createConnection();
    }
    await channel.assertExchange(exchangeName, "direct");
    channel.publish(exchangeName, routingKey, Buffer.from(message));
    log.info(logMessage);
  } catch (error) {
    log.log(
      "error",
      "AuthService Provider publishDirectMessage() method error:",
      error
    );
  }
}

module.exports = {
  publishDirectMessage,
};
