const express = require("express");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const http = require("http");
const winstonLogger = require("./utils/logger");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("./utils/error-handler");
const config = require("./config");
const ElasticSearch = require("./elasticsearch");
const appRoutes = require("./routes");

const SERVER_PORT = 4000;
const log = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, "gateway", "debug");

class GatewayServer {
  constructor(app) {
    this.app = app;
  }

  start() {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.startElasticsearch();
    this.errorHandler(this.app);
    this.startServer(this.app);
  }

  securityMiddleware(app) {
    app.set("trust proxy", 1);
    app.use(
      cookieSession({
        name: "session",
        keys: [`${config.SECRET_KEY_ONE}`, `${config.SECRET_KEY_TWO}`],
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV !== "development",
        // ...(config.NODE_ENV !== "development" && { sameSite: "none" }),
        // sameSite: "none",
      })
    );
    app.use(helmet());
    app.use(
      cors({
        origin: config.CLIENT_URL,
        credential: true,
        method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );
  }
  standardMiddleware(app) {
    app.use(compression());
    app.use(express.json({ limit: "200mb" }));
    app.use(express.urlencoded({ extended: true, limit: "200mb" }));
  }

  routesMiddleware(app) {
    appRoutes(app);
  }

  startElasticsearch() {
    ElasticSearch.checkConnection();
  }

  errorHandler(app) {
    app.use("*", (req, res, next) => {
      const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
      log.log("error", `${fullUrl} does not exist`);
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "The endpoint does not exist." });
      next();
    });

    app.use((err, _req, res, next) => {
      if (err instanceof CustomError) {
        log.log("error", `GatewayService ${err.comingFrom}:`, err);
        res.status(err.statusCode).json(err.serializeErrors());
      }
      next();
    });
  }

  async startServer(app) {
    try {
      const httpServer = new http.Server(app);
      this.startHttpServer(httpServer);
    } catch (error) {
      log.log("error", `GatewayService startServer() error method:`, error);
    }
  }

  async startHttpServer(http) {
    try {
      log.info(`Starting Gateway Server starts with process id ${process.pid}`);
      http.listen(SERVER_PORT, () => {
        log.info(`Gateway Server is running on port ${SERVER_PORT}`);
      });
    } catch (error) {
      log.log("error", `GatewayService startHttpServer() error method:`, error);
    }
  }
}

module.exports = GatewayServer;
