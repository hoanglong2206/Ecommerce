const crypto = require("crypto");
// const config = require("../config");
// const { authChannel } = require("../server");
// const { publishDirectMessage } = require("../queues/auth.producer");
const { StatusCodes } = require("http-status-codes");
const {
  getAuthUserById,
  getUserByEmail,
  updateVerifyEmailField,
} = require("../services/auth.service");
const { lowerCase } = require("../utils/helper");
const { omit } = require("lodash");

async function currentUser(req, res) {
  let user = null;

  const existingUser = await getAuthUserById(req.currentUser.id);
  if (Object.keys(existingUser).length) {
    user = existingUser;
  }

  const userData = omit(user, ["emailVerificationToken", "passwordResetToken"]);

  res
    .status(StatusCodes.OK)
    .json({ message: "Authenticated user", user: userData });
}

async function resendEmail(req, res) {
  const { email, userId } = req.body;
  const checkIfUserExist = await getUserByEmail(lowerCase(email));
  if (!checkIfUserExist) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "User not found",
    });
  }
  const randomBytes = await Promise.resolve(crypto.randomBytes(20));
  const randomCharacters = randomBytes.toString("hex");
  //   const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${randomCharacters}`;
  await updateVerifyEmailField(parseInt(userId), 0, randomCharacters);
  //   const messageDetails = {
  //     receiverEmail: lowerCase(email),
  //     verifyLink: verificationLink,
  //     template: "verifyEmail",
  //   };
  //   await publishDirectMessage(
  //     authChannel,
  //     "app-email",
  //     "auth-email",
  //     JSON.stringify(messageDetails),
  //     "Verify email message has been sent to notification service."
  //   );
  const updatedUser = await getAuthUserById(parseInt(userId));

  res
    .status(StatusCodes.OK)
    .json({ message: "Email verification sent", user: updatedUser });
}

module.exports = { currentUser, resendEmail };
