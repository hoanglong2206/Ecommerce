const { currentUser, resendEmail } = require("../controllers/current-user");
const express = require("express");
const refreshToken = require("../controllers/refresh-token");

const router = express.Router();

function currentUserRoutes() {
  router.get("/current-user", currentUser);
  router.put("/resend-email", resendEmail);
  router.get("/refresh-token/:username", refreshToken);

  return router;
}

module.exports = currentUserRoutes;
