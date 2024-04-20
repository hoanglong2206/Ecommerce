const { authService } = require("../../services/api/auth.service");
const { StatusCodes } = require("http-status-codes");

class login {
  async read(req, res) {
    try {
      const response = await authService.login(req.body);
      req.session = { jwt: response.data.token };
      res.status(StatusCodes.OK).json({
        message: response.data.message,
        user: response.data.user,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: error.response.data.message,
      });
    }
  }
}

module.exports = login;
