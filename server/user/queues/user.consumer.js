const config = require("../config");
const { createUser, updateUserPurchase } = require("../services/user.service");
const winstonLogger = require("../utils/logger");
const { createConnection } = require("./connection");

const log = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  "usersServiceConsumer",
  "debug"
);

const consumeUserDirectMessage = async (channel) => {
  try {
    if (!channel) {
      channel = await createConnection();
    }

    const exchangeName = "app-users";
    const routingKey = "auth-users";
    const queueName = "user-update-queue";

    await channel.assertExchange(exchangeName, "direct");
    const messageQueue = await channel.assertQueue(queueName, {
      durable: true,
      autoDelete: false,
    });

    await channel.bindQueue(messageQueue.queue, exchangeName, routingKey);

    channel.consume(messageQueue.queue, async (message) => {
      const { type } = JSON.parse(message.content.toString());
      if (type === "auth") {
        const { username, email, photo, createAt } = JSON.parse(
          message.content.toString()
        );

        const user = {
          username,
          email,
          photo,
          productPurchased: [],
          createAt,
        };

        await createUser(user);
      } else {
        const { userId, productId } = JSON.parse(message.content.toString());

        await updateUserPurchase(userId, productId, type);
      }
    });
  } catch (error) {
    log.log(
      "error",
      "UserService UserConsumer consumeBuyerDirectMessage() method error: ",
      error
    );
  }
};

module.exports = { consumeUserDirectMessage };
