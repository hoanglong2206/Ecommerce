const healthRoute = require("./routes/health");

const BASE_URL = "/api/v1";

module.exports = (app) => {
  app.use("", healthRoute.routes());
};
