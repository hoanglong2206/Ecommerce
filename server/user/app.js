const express = require("express");
const { start } = require("./server");
const { databaseConnection } = require("./database");
const config = require("./config");

const initialize = () => {
  config.cloudinaryConfig();
  const app = express();
  databaseConnection();
  start(app);
};

initialize();
