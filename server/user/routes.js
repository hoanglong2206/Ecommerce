const healthRoutes = require("./routes/health");
const userRoutes = require("./routes/user");
const verifyGatewayRequest = require("./utils/gateway-middleware");

const BASE_URL = "/api/v1/user";

module.exports = (app) => {
  app.use("", healthRoutes());
  app.use(BASE_URL, verifyGatewayRequest, userRoutes());
};
