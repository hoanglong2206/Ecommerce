const { authService } = require("../../services/api/auth.service");
const { StatusCodes } = require("http-status-codes");

class password {
  async forgotPassword(req, res) {
    const response = await authService.forgotPassword(req.body.email);
    res.status(StatusCodes.OK).json({
      message: response.data.message,
    });
  }

  async resetPassword(req, res) {
    const response = await authService.resetPassword(
      req.params.token,
      req.body.password,
      req.body.confirmPassword
    );
    res.status(StatusCodes.OK).json({
      message: response.data.message,
    });
  }

  async changePassword(req, res) {
    try {
      const response = await authService.changePassword(
        req.body.currentPassword,
        req.body.newPassword,
        req.body.confirmNewPassword
      );
      res.status(StatusCodes.OK).json({
        message: response.data.message,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.response.data.message,
      });
    }
  }
}

module.exports = password;
