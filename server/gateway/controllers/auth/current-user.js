const { StatusCodes } = require("http-status-codes");
const { authService } = require("../../services/api/auth.service");

class CurrentUser {
  async read(_req, res) {
    const response = await authService.getCurrentUser();
    res.status(StatusCodes.OK).json({
      message: response.data.message,
      user: response.data.user,
    });
  }

  async resendEmail(req, res) {
    const response = await authService.resendEmail(req.body);
    res.status(StatusCodes.OK).json({
      message: response.data.message,
      user: response.data.user,
    });
  }
}

module.exports = CurrentUser;
