const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const loginSchema = require("../schemes/login");
const { getUserByEmail, signToken } = require("../services/auth.service");
const AuthModel = require("../models/auth.schema");
const { omit } = require("lodash");

async function login(req, res) {
  const { error } = await Promise.resolve(loginSchema.validate(req.body));

  if (error?.details) {
    return res.status(StatusCodes.OK).json({
      message: error.details[0].message,
    });
  }

  const { email, password } = req.body;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return res.status(StatusCodes.OK).json({
      message: "User not found",
    });
  }

  const passwordMatch = await AuthModel.prototype.comparePassword(
    password,
    existingUser.password
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.OK).json({
      message: "Invalid credentials",
    });
  }

  const userJWT = signToken(
    existingUser.id,
    existingUser.email,
    existingUser.username
  );
  const userData = omit(existingUser, ["password"]);

  res.status(StatusCodes.OK).json({
    message: "User logged in successfully",
    user: userData,
    token: userJWT,
  });
}

module.exports = login;
