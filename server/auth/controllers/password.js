const crypto = require("crypto");
// const config = require("../config");
// const { authChannel } = require("../server");
// const { publishDirectMessage } = require("../queues/auth.producer");
const { BadRequestError } = require("../utils/error-handler");
const AuthModel = require("../models/auth.schema");
const { StatusCodes } = require("http-status-codes");
const {
  emailSchema,
  passwordSchema,
  changePasswordSchema,
} = require("../schemes/password");
const {
  getUserByEmail,
  updatePasswordToken,
  getAuthUserByPasswordToken,
  updatePassword,
  getUserByUsername,
} = require("../services/auth.service");

async function forgotPassword(req, res) {
  const { error } = await Promise.resolve(emailSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      "Forgot password error"
    );
  }

  const { email } = req.body;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    throw new BadRequestError(
      "User with this email does not exist",
      "Forgot password error"
    );
  }

  const randomBytes = await Promise.resolve(crypto.randomBytes(20));
  const randomChars = randomBytes.toString("hex");
  const date = new Date();
  date.setHours(date.getHours() + 1);
  await updatePasswordToken(existingUser.id, randomChars, date);

  // const resetLink = `${config.CLIENT_URL}/reset_password?token=${randomChars}`;
  // const messageDetails = {
  //   receiverEmail: existingUser.email,
  //   resetLink,
  //   username: existingUser.username,
  //   template: "forgotPassword",
  // };
  // await publishDirectMessage(
  //   authChannel,
  //   "app-email",
  //   "auth-email",
  //   JSON.stringify(messageDetails),
  //   "Forgot password message sent to notification service."
  // );

  res.status(StatusCodes.OK).json({ message: "Password reset email sent." });
}

async function resetPassword(req, res) {
  const { error } = await Promise.resolve(passwordSchema.validate(req.body));
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      "Password resetPassword() method error"
    );
  }
  const { password, confirmPassword } = req.body;
  const { token } = req.params;
  if (password !== confirmPassword) {
    throw new BadRequestError(
      "Passwords do not match",
      "Password resetPassword() method error"
    );
  }

  const existingUser = await getAuthUserByPasswordToken(token);
  if (!existingUser) {
    throw new BadRequestError(
      "Reset token has expired",
      "Password resetPassword() method error"
    );
  }
  const hashedPassword = await AuthModel.prototype.hashPassword(password);
  await updatePassword(existingUser.id, hashedPassword);

  // const messageDetails = {
  //   username: existingUser.username,
  //   template: "resetPasswordSuccess",
  // };
  // await publishDirectMessage(
  //   authChannel,
  //   "app-email",
  //   "auth-email",
  //   JSON.stringify(messageDetails),
  //   "Reset password success message sent to notification service."
  // );
  res
    .status(StatusCodes.OK)
    .json({ message: "Password successfully updated." });
}

async function changePassword(req, res) {
  const { error } = await Promise.resolve(
    changePasswordSchema.validate(req.body)
  );
  if (error?.details) {
    throw new BadRequestError(
      error.details[0].message,
      "Password changePassword() method error"
    );
  }
  const { newPassword } = req.body;

  const existingUser = await getUserByUsername(`${req.currentUser?.username}`);
  if (!existingUser) {
    throw new BadRequestError(
      "Invalid password",
      "Password changePassword() method error"
    );
  }
  const hashedPassword = await AuthModel.prototype.hashPassword(newPassword);
  await updatePassword(existingUser.id, hashedPassword);

  // const messageDetails = {
  //   username: existingUser.username,
  //   template: "resetPasswordSuccess",
  // };
  // await publishDirectMessage(
  //   authChannel,
  //   "app-email",
  //   "auth-email",
  //   JSON.stringify(messageDetails),
  //   "Password change success message sent to notification service."
  // );
  res
    .status(StatusCodes.OK)
    .json({ message: "Password successfully updated." });
}

module.exports = { forgotPassword, changePassword, resetPassword };
