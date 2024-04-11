const express = require("express");
const GatewayServer = require("./server");

class Application {
  initialize() {
    const app = express();
    const server = new GatewayServer(app);
    server.start();
  }
}

const application = new Application();
application.initialize();
