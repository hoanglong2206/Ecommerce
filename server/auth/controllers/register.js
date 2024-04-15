const { StatusCodes } = require("http-status-codes");
const crypto = require("crypto");
// const config = require("../config");
// const { v4 } = require("uuid");
// const { authChannel } = require("../server");
// const { publishDirectMessage } = require("../queues/auth.producer");
const { firstLetterUppercase, lowerCase } = require("../utils/helper");
const registerSchema = require("../schemes/register");
const { BadRequestError } = require("../utils/error-handler");
const {
  createAuthUser,
  getUserByUsernameOrEmail,
  signToken,
} = require("../services/auth.service");

async function register(req, res) {
  const { error } = await Promise.resolve(registerSchema.validate(req.body));

  if (error?.details) {
    throw new BadRequestError(error.details[0].message, "Register error");
  }

  const { username, email, password } = req.body;
  const checkUser = await getUserByUsernameOrEmail(username, email);

  if (checkUser) {
    throw new BadRequestError(
      "Invalid credentials. Email or Username",
      "Register error"
    );
  }
  const randomBytes = await Promise.resolve(crypto.randomBytes(20));
  const randomChars = randomBytes.toString("hex");
  const authData = {
    username: firstLetterUppercase(username),
    email: lowerCase(email),
    password,
    emailVerificationToken: randomChars,
  };

  const result = await createAuthUser(authData);
  //   const verificationLink = `${config.CLIENT_URL}/confirm_email?v_token=${authData.emailVerificationToken}`;

  //   const messageDetails = {
  //     receiveEmail: result.email,
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

  const userJWT = signToken(result.id, result.email, result.username);
  res.status(StatusCodes.CREATED).json({
    message: "User created successfully",
    user: result,
    token: userJWT,
  });
}

module.exports = register;
