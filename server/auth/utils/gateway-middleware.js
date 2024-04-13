const JWT = require("jsonwebtoken");
const { NotAuthorizedError } = require("./error-handler");
const config = require("../config");

const tokens = [
  "auth",
  "user",
  "product",
  "search",
  "admin",
  "message",
  "order",
  "review",
];

function verifyGatewayRequest(req, _res, next) {
  if (!req.headers?.gatewayToken) {
    throw new NotAuthorizedError(
      "Invalid request",
      "verifyGatewayRequest() method: Request not coming from api gateway"
    );
  }
  const token = req.headers?.gatewayToken;
  if (!token) {
    throw new NotAuthorizedError(
      "Invalid request",
      "verifyGatewayRequest() method: Request not coming from api gateway"
    );
  }

  try {
    const payload = JWT.verify(token, config.GATEWAY_JWT_TOKEN);
    if (!tokens.includes(payload.id)) {
      throw new NotAuthorizedError(
        "Invalid request",
        "verifyGatewayRequest() method: Request payload is invalid"
      );
    }
  } catch (error) {
    throw new NotAuthorizedError(
      "Invalid request",
      "verifyGatewayRequest() method: Request not coming from api gateway"
    );
  }
  next();
}

module.exports = verifyGatewayRequest;
