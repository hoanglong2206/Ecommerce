const create = require("../controllers/create");
const update = require("../controllers/update");
const { id, email, username } = require("../controllers/get");
const express = require("express");

const router = express.Router();

const userRouter = () => {
  router.post("/", create);
  router.put("/:id", update);
  router.get("/:id", id);
  router.get("/email", email);
  router.get("/username/:username", username);

  return router;
};

module.exports = userRouter;
