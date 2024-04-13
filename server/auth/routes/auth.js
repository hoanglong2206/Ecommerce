const register = require("../controllers/register");
const express = require("express");

const router = express.Router();

function authRoutes() {
  router.post("/register", register);

  return router;
}

module.exports = authRoutes;
