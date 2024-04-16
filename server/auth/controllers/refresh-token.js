const { StatusCodes } = require("http-status-codes");
const { getUserByUsername, signToken } = require("../services/auth.service");

async function refreshToken(req, res) {
  const existingUser = await getUserByUsername(req.params.username);
  const userJWT = signToken(
    existingUser.id,
    existingUser.email,
    existingUser.username
  );

  res
    .status(StatusCodes.OK)
    .json({ message: "Refresh token", user: existingUser, token: userJWT });
}

module.exports = refreshToken;
