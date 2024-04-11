const axios = require("axios");
const { sign } = require("jsonwebtoken");
const config = require("../config");

class AxiosService {
  constructor(baseUrl, serviceName) {
    this.axios = this.axiosCreateInstance(baseUrl, serviceName);
  }

  axiosCreateInstance(baseUrl, serviceName) {
    let requestGatewayToken = "";
    if (serviceName) {
      requestGatewayToken = sign(
        { id: serviceName },
        `${config.GATEWAY_JWT_TOKEN}`
      );
    }
    const instance = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        gatewayToken: requestGatewayToken,
      },
      withCredentials: true,
    });
    return instance;
  }
}

module.exports = AxiosService;
