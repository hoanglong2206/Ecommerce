const http = require("http");
const winstonLogger = require("./utils/logger");
const config = require("./config");
const express = require("express");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const { verify } = require("jsonwebtoken");
const compression = require("compression");
const { checkConnection } = require("./elasticsearch");
const { createConnection } = require("./queues/connection");
const appRoutes = require("./routes");
const { StatusCodes } = require("http-status-codes");
const { consumeUserDirectMessage } = require("./queues/user.consumer");

const SERVER_PORT = 4003;
const log = winstonLogger(
  `${config.ELASTIC_SEARCH_URL}`,
  "userServer",
  "debug"
);

function start(app) {
  securityMiddleware(app);
  standardMiddleware(app);
  routesMiddleware(app);
  startQueues();
  startElasticsearch();
  userErrorHandler(app);
  startServer(app);
}

function securityMiddleware(app) {
  app.set("trust proxy", 1);
  app.use(hpp());
  app.use(helmet());
  app.use(
    cors({
      origin: config.API_GATEWAY_URL,
      credential: true,
      method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
  );
  app.use((req, _res, next) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const payload = verify(token, config.JWT_TOKEN);
      req.currentUser = payload;
    }
    next();
  });
}

function standardMiddleware(app) {
  app.use(compression());
  app.use(express.json({ limit: "200mb" }));
  app.use(express.urlencoded({ extended: true, limit: "200mb" }));
}

function routesMiddleware(app) {
  appRoutes(app);
}

async function startQueues() {
  const userChannel = await createConnection();
  await consumeUserDirectMessage(userChannel);
}

function startElasticsearch() {
  checkConnection();
}

function userErrorHandler(app) {
  app.use((error, _req, res, next) => {
    log.log("error", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
    next();
  });
}

function startServer(app) {
  try {
    const httpServer = new http.Server(app);
    log.info(`User server has started with process id ${process.pid}`);
    httpServer.listen(SERVER_PORT, () => {
      log.info(`User server running on port ${SERVER_PORT}`);
    });
  } catch (error) {
    log.log("error", "UserService startServer() method error:", error);
  }
}

module.exports = { start };
