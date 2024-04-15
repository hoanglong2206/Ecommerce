const express = require("express");
const login = require("../controllers/auth/login");
const register = require("../controllers/auth/register");
const verifyEmail = require("../controllers/auth/verify-email");
const password = require("../controllers/auth/password");

class AuthRoute {
  constructor() {
    this.router = express.Router();
  }

  routes() {
    this.router.post("/auth/register", register.prototype.create);
    this.router.post("/auth/login", login.prototype.read);
    this.router.put("/auth/verify-email", verifyEmail.prototype.update);
    this.router.put("/auth/forgot-password", password.prototype.forgotPassword);
    this.router.put(
      "/auth/reset-password/:token",
      password.prototype.resetPassword
    );
    this.router.put("/auth/change-password", password.prototype.changePassword);
    return this.router;
  }
}

module.exports = new AuthRoute();
