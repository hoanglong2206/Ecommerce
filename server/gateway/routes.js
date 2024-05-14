const healthRoute = require("./routes/health");
const authRoute = require("./routes/auth");
const currentUserRoute = require("./routes/current-user");
const userRoute = require("./routes/user");
const AuthMiddleware = require("./services/auth-middleware");

const BASE_URL = "/api/gateway/v1";

module.exports = (app) => {
  app.use("", healthRoute.routes());
  app.use(BASE_URL, authRoute.routes());
  app.use(BASE_URL, AuthMiddleware.verifyUser, currentUserRoute.routes());
  app.use(BASE_URL, AuthMiddleware.verifyUser, userRoute.routes());
};
