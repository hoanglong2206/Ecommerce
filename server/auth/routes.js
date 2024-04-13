const authRoutes = require("./routes/auth");
const healthRoutes = require("./routes/health");
const verifyGatewayRequest = require("./utils/gateway-middleware");

const BASE_URL = "/api/v1/auth";

module.exports = (app) => {
  app.use("", healthRoutes());
  app.use(BASE_URL, verifyGatewayRequest, authRoutes());
};
