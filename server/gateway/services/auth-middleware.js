const config = require("../config");
const { verify } = require("jsonwebtoken");

class AuthMiddleware {
  verifyUser(req, _res, next) {
    if (!req.session?.jwt) {
      return next(new Error("Token is not available. Please login again."));
    }

    try {
      const payload = verify(req.session?.jwt, `${config.JWT_TOKEN}`);
      req.currentUser = payload;
    } catch (error) {
      return next(new Error("Token is not available. Please login again."));
    }
    next();
  }

  checkAuthentication(req, _res, next) {
    if (!req.currentUser) {
      return next(new Error("You are not authenticated."));
    }
    next();
  }
}

module.exports = new AuthMiddleware();
