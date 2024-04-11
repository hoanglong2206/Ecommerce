const express = require("express");
const healthController = require("../controllers/health");

class HealthRoute {
  constructor() {
    this.router = express.Router();
  }

  routes() {
    this.router.get("/gateway-health", healthController.prototype.health);
    return this.router;
  }
}

module.exports = new HealthRoute();
