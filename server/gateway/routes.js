const healthRoute = require("./routes/health");
const authRoute = require("./routes/auth");

const BASE_URL = "/api/gateway/v1";

module.exports = (app) => {
  app.use("", healthRoute.routes());
  app.use(BASE_URL, authRoute.routes());
};
