const JWT = require("jsonwebtoken");
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
    return next(
      new Error("Invalid request: Request not coming from api gateway")
    );
  }
  const token = req.headers?.gatewayToken;
  if (!token) {
    return next(
      new Error("Invalid request: Request not coming from api gateway")
    );
  }

  try {
    const payload = JWT.verify(token, config.GATEWAY_JWT_TOKEN);
    if (!tokens.includes(payload.id)) {
      return next(new Error("Invalid request: Request payload is invalid"));
    }
  } catch (error) {
    return next(
      new Error("Invalid request: Request not coming from api gateway")
    );
  }
  next();
}

module.exports = verifyGatewayRequest;
