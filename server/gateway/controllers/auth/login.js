const { authService } = require("../../services/api/auth.service");
const { StatusCodes } = require("http-status-codes");

class login {
  async read(req, res) {
    const response = await authService.login(req.body);
    req.session = { jwt: response.data.token };
    res.status(StatusCodes.OK).json({
      message: response.data.message,
      user: response.data.user,
    });
  }
}

module.exports = login;
