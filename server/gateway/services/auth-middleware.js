const config = require("../config");
const { verify } = require("jsonwebtoken");
const {
  NotAuthorizedError,
  BadRequestError,
} = require("../utils/error-handler");

class AuthMiddleware {
  verifyUser(req, _res, next) {
    if (!req.session?.jwt) {
      throw new NotAuthorizedError(
        "Token is not available. Please login again.",
        "GatewayService verifyUser() method error"
      );
    }

    try {
      const payload = verify(req.session?.jwt, `${config.JWT_TOKEN}`);
      req.currentUser = payload;
    } catch (error) {
      throw new NotAuthorizedError(
        "Token is not available. Please login again.",
        "GatewayService verifyUser() method invalid session error"
      );
    }
    next();
  }

  checkAuthentication(req, _res, next) {
    if (!req.currentUser) {
      throw new BadRequestError(
        "Authentication is required to access this route.",
        "GatewayService checkAuthentication() method error"
      );
    }
    next();
  }
}

module.exports = new AuthMiddleware();
