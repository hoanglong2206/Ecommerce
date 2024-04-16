const { authService } = require("../../services/api/auth.service");
const { StatusCodes } = require("http-status-codes");

class refreshToken {
  async token(req, res) {
    const response = await authService.getRefreshToken(req.params.username);
    req.session = { jwt: response.data.token };
    res
      .status(StatusCodes.OK)
      .json({ message: response.data.message, user: response.data.user });
  }
}

module.exports = refreshToken;
