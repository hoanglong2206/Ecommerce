const { StatusCodes } = require("http-status-codes");

class healthController {
  health(_req, res) {
    res.status(StatusCodes.OK).send("API Gateway service is healthy and OK.");
  }
}

module.exports = healthController;
