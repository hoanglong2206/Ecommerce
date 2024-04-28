const healthRoutes = require("./routes/health");
const verifyGatewayRequest = require("./utils/gateway-middleware");

const BASE_URL = "/api/v1/user";

module.exports = (app) => {
  app.use("", healthRoutes());
};
