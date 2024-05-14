const express = require("express");
const AuthMiddleware = require("../services/auth-middleware");
const update = require("../controllers/user/update");
const create = require("../controllers/user/create");
const get = require("../controllers/user/get");

const router = express.Router();

class UserRoute {
  constructor() {
    this.router = router;
  }

  routes() {
    this.router.post("/user/", create.prototype.create);
    this.router.get(
      "/user/:id",
      AuthMiddleware.checkAuthentication,
      get.prototype.id
    );
    this.router.get(
      "/user/username/:username",
      AuthMiddleware.checkAuthentication,
      get.prototype.username
    );
    this.router.get(
      "/user/email",
      AuthMiddleware.checkAuthentication,
      get.prototype.email
    );
    this.router.put(
      "/user/:id",
      AuthMiddleware.checkAuthentication,
      update.prototype.update
    );
    return this.router;
  }
}

module.exports = new UserRoute();
