const { authService } = require("../../services/api/auth.service");
const { StatusCodes } = require("http-status-codes");

class verifyEmail {
  async update(req, res) {
    const response = await authService.verifyEmail(req.body.token);
    res.status(StatusCodes.OK).json({
      message: response.data.message,
      user: response.data.user,
    });
  }
}

module.exports = verifyEmail;
