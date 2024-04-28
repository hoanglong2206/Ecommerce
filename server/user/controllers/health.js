const { StatusCodes } = require("http-status-codes");

function health(_req, res) {
  res.status(StatusCodes.OK).send("User service is healthy and OK.");
}

module.exports = health;
