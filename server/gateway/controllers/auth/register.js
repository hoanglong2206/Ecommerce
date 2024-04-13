const { authService } = require("../../services/api/auth.service");
const { statusCodes } = require("http-status-codes");

class register {
  async create(req, res) {
    const response = await authService.register(req.body);
    req.session = { jwt: response.data.token };
    res.status(statusCodes.CREATED).json({
      message: response.data.message,
      user: response.data.user,
    });
  }
}

module.exports = register;
