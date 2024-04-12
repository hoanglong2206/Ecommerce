const healthController = require("../controllers/health");
const express = require("express");

const router = express.Router();

function healthRoutes() {
  router.get("/auth-health", healthController);
  return router;
}

module.exports = healthRoutes;
