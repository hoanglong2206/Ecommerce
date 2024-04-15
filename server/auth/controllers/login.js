const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
const loginSchema = require("../schemes/login");
const { BadRequestError } = require("../utils/error-handler");
const { getUserByEmail, signToken } = require("../services/auth.service");
const AuthModel = require("../models/auth.schema");
const { omit } = require("lodash");

async function login(req, res) {
  const { error } = await Promise.resolve(loginSchema.validate(req.body));

  if (error?.details) {
    throw new BadRequestError(error.details[0].message, "Login error");
  }

  const { email, password } = req.body;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    throw new BadRequestError("Invalid credentials. Email", "Login error");
  }

  const passwordMatch = await AuthModel.prototype.comparePassword(
    password,
    existingUser.password
  );

  if (!passwordMatch) {
    throw new BadRequestError("Invalid credentials. Password", "Login error");
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
