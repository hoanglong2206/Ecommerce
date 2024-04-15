const login = require("../controllers/login");
const register = require("../controllers/register");
const express = require("express");
const verifyEmail = require("../controllers/verify-email");
const {
  forgotPassword,
  resetPassword,
  changePassword,
} = require("../controllers/password");

const router = express.Router();

function authRoutes() {
  router.post("/register", register);
  router.post("/login", login);
  router.put("/verify-email", verifyEmail);
  router.put("/forgot-password", forgotPassword);
  router.put("/reset-password/:token", resetPassword);
  router.put("/change-password", changePassword);

  return router;
}

module.exports = authRoutes;
