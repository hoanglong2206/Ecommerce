import { winstonLogger } from "./utils/logger";
import cookieSession from "cookie-session";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { json, urlencoded } from "express";

const SERVER_PORT = 4000;
const log = winstonLogger("", "gateway", "debug");

export class GatewayServer {
  constructor(app) {
    this.app = app;
  }

  start() {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.startElasticsearch();
  }

  securityMiddleware(app) {
    app.set("trust proxy", 1);
    app.use(
      cookieSession({
        name: "session",
        keys: [],
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: false,
      })
    );
    app.use(helmet());
    app.use(
      cors({
        origin: "",
        credential: true,
        method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      })
    );
  }
  standardMiddleware(app) {
    app.use(compression());
    app.use(json({ limit: "200mb" }));
    app.use(urlencoded({ extended: true, limit: "200mb" }));
  }

  routesMiddleware(app) {}

  startElasticsearch() {}

  errorHandler(app) {
    app.use("*", (req, res, next) => {
      const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    });
    log.log("error", `${fullUrl} does not exist`);
    res.status(404).json({ message: "The endpoint does not exist." });
    next();
  }
}
