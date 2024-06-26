const crypto = require("crypto");
// const config = require("../config");
// const { authChannel } = require("../server");
// const { publishDirectMessage } = require("../queues/auth.producer");

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
} = require("../services/auth.service");

async function forgotPassword(req, res) {
  const { error } = await Promise.resolve(emailSchema.validate(req.body));
  if (error?.details) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  const { email } = req.body;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User not found",
    });
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
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }
  const { password, confirmPassword } = req.body;
  const { token } = req.params;
  if (password !== confirmPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Passwords do not match",
    });
  }

  const existingUser = await getAuthUserByPasswordToken(token);
  if (!existingUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Invalid token",
    });
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
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.details[0].message,
    });
  }

  const existingUser = await getUserByEmail(`${req.currentUser?.email}`);
  if (!existingUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      message: "User not found",
    });
  }

  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const passwordMatch = await AuthModel.prototype.comparePassword(
    currentPassword,
    existingUser.password
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Password is incorrect",
    });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Passwords do not match",
    });
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
