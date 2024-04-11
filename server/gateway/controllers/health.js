const { StatusCodes } = require("http-status-codes");

class healthController {
  health(_req, res) {
    res.status(StatusCodes.OK).send("API Gateway is healthy");
  }
}

module.exports = healthController;
