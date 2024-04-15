const register = require("../controllers/auth/register");
const express = require("express");

class AuthRoute {
  constructor() {
    this.router = express.Router();
  }

  routes() {
    this.router.post("/auth/register", register.prototype.create);
    return this.router;
  }
}

module.exports = new AuthRoute();
