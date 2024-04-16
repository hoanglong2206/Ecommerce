const refreshToken = require("../controllers/auth/refresh-token");
const CurrentUser = require("../controllers/auth/current-user");
const AuthMiddleware = require("../services/auth-middleware");
const express = require("express");

class CurrentUserRoute {
  constructor() {
    this.router = express.Router();
  }

  routes() {
    this.router.get(
      "/current-user",
      AuthMiddleware.checkAuthentication,
      CurrentUser.prototype.read
    );
    this.router.put(
      "/resend-email",
      AuthMiddleware.checkAuthentication,
      CurrentUser.prototype.resendEmail
    );
    this.router.get(
      "/refresh-token/:username",
      AuthMiddleware.checkAuthentication,
      refreshToken.prototype.token
    );
    return this.router;
  }
}

module.exports = new CurrentUserRoute();
