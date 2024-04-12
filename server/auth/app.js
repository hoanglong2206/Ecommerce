const express = require("express");
const { start } = require("./server");
const { databaseConnection } = require("./database");
const config = require("./config");

const initialize = () => {
  const app = express();
  databaseConnection();
  start(app);
};

initialize();
